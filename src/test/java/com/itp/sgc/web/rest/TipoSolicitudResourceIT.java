package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.TipoSolicitud;
import com.itp.sgc.repository.TipoSolicitudRepository;
import com.itp.sgc.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.itp.sgc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TipoSolicitudResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class TipoSolicitudResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_TIPO_SOL = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_SOL = "BBBBBBBBBB";

    @Autowired
    private TipoSolicitudRepository tipoSolicitudRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTipoSolicitudMockMvc;

    private TipoSolicitud tipoSolicitud;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoSolicitudResource tipoSolicitudResource = new TipoSolicitudResource(tipoSolicitudRepository);
        this.restTipoSolicitudMockMvc = MockMvcBuilders.standaloneSetup(tipoSolicitudResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoSolicitud createEntity(EntityManager em) {
        TipoSolicitud tipoSolicitud = new TipoSolicitud()
            .code(DEFAULT_CODE)
            .tipoSol(DEFAULT_TIPO_SOL);
        return tipoSolicitud;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoSolicitud createUpdatedEntity(EntityManager em) {
        TipoSolicitud tipoSolicitud = new TipoSolicitud()
            .code(UPDATED_CODE)
            .tipoSol(UPDATED_TIPO_SOL);
        return tipoSolicitud;
    }

    @BeforeEach
    public void initTest() {
        tipoSolicitud = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoSolicitud() throws Exception {
        int databaseSizeBeforeCreate = tipoSolicitudRepository.findAll().size();

        // Create the TipoSolicitud
        restTipoSolicitudMockMvc.perform(post("/api/tipo-solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoSolicitud)))
            .andExpect(status().isCreated());

        // Validate the TipoSolicitud in the database
        List<TipoSolicitud> tipoSolicitudList = tipoSolicitudRepository.findAll();
        assertThat(tipoSolicitudList).hasSize(databaseSizeBeforeCreate + 1);
        TipoSolicitud testTipoSolicitud = tipoSolicitudList.get(tipoSolicitudList.size() - 1);
        assertThat(testTipoSolicitud.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTipoSolicitud.getTipoSol()).isEqualTo(DEFAULT_TIPO_SOL);
    }

    @Test
    @Transactional
    public void createTipoSolicitudWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoSolicitudRepository.findAll().size();

        // Create the TipoSolicitud with an existing ID
        tipoSolicitud.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoSolicitudMockMvc.perform(post("/api/tipo-solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoSolicitud)))
            .andExpect(status().isBadRequest());

        // Validate the TipoSolicitud in the database
        List<TipoSolicitud> tipoSolicitudList = tipoSolicitudRepository.findAll();
        assertThat(tipoSolicitudList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoSolicituds() throws Exception {
        // Initialize the database
        tipoSolicitudRepository.saveAndFlush(tipoSolicitud);

        // Get all the tipoSolicitudList
        restTipoSolicitudMockMvc.perform(get("/api/tipo-solicituds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoSolicitud.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].tipoSol").value(hasItem(DEFAULT_TIPO_SOL.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoSolicitud() throws Exception {
        // Initialize the database
        tipoSolicitudRepository.saveAndFlush(tipoSolicitud);

        // Get the tipoSolicitud
        restTipoSolicitudMockMvc.perform(get("/api/tipo-solicituds/{id}", tipoSolicitud.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoSolicitud.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.tipoSol").value(DEFAULT_TIPO_SOL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoSolicitud() throws Exception {
        // Get the tipoSolicitud
        restTipoSolicitudMockMvc.perform(get("/api/tipo-solicituds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoSolicitud() throws Exception {
        // Initialize the database
        tipoSolicitudRepository.saveAndFlush(tipoSolicitud);

        int databaseSizeBeforeUpdate = tipoSolicitudRepository.findAll().size();

        // Update the tipoSolicitud
        TipoSolicitud updatedTipoSolicitud = tipoSolicitudRepository.findById(tipoSolicitud.getId()).get();
        // Disconnect from session so that the updates on updatedTipoSolicitud are not directly saved in db
        em.detach(updatedTipoSolicitud);
        updatedTipoSolicitud
            .code(UPDATED_CODE)
            .tipoSol(UPDATED_TIPO_SOL);

        restTipoSolicitudMockMvc.perform(put("/api/tipo-solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoSolicitud)))
            .andExpect(status().isOk());

        // Validate the TipoSolicitud in the database
        List<TipoSolicitud> tipoSolicitudList = tipoSolicitudRepository.findAll();
        assertThat(tipoSolicitudList).hasSize(databaseSizeBeforeUpdate);
        TipoSolicitud testTipoSolicitud = tipoSolicitudList.get(tipoSolicitudList.size() - 1);
        assertThat(testTipoSolicitud.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTipoSolicitud.getTipoSol()).isEqualTo(UPDATED_TIPO_SOL);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoSolicitud() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitudRepository.findAll().size();

        // Create the TipoSolicitud

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoSolicitudMockMvc.perform(put("/api/tipo-solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoSolicitud)))
            .andExpect(status().isBadRequest());

        // Validate the TipoSolicitud in the database
        List<TipoSolicitud> tipoSolicitudList = tipoSolicitudRepository.findAll();
        assertThat(tipoSolicitudList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoSolicitud() throws Exception {
        // Initialize the database
        tipoSolicitudRepository.saveAndFlush(tipoSolicitud);

        int databaseSizeBeforeDelete = tipoSolicitudRepository.findAll().size();

        // Delete the tipoSolicitud
        restTipoSolicitudMockMvc.perform(delete("/api/tipo-solicituds/{id}", tipoSolicitud.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TipoSolicitud> tipoSolicitudList = tipoSolicitudRepository.findAll();
        assertThat(tipoSolicitudList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoSolicitud.class);
        TipoSolicitud tipoSolicitud1 = new TipoSolicitud();
        tipoSolicitud1.setId(1L);
        TipoSolicitud tipoSolicitud2 = new TipoSolicitud();
        tipoSolicitud2.setId(tipoSolicitud1.getId());
        assertThat(tipoSolicitud1).isEqualTo(tipoSolicitud2);
        tipoSolicitud2.setId(2L);
        assertThat(tipoSolicitud1).isNotEqualTo(tipoSolicitud2);
        tipoSolicitud1.setId(null);
        assertThat(tipoSolicitud1).isNotEqualTo(tipoSolicitud2);
    }
}
