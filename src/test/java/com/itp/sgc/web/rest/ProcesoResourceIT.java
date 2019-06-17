package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.Proceso;
import com.itp.sgc.repository.ProcesoRepository;
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
 * Integration tests for the {@Link ProcesoResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class ProcesoResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_PROCESO = "AAAAAAAAAA";
    private static final String UPDATED_PROCESO = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_MACRO_PROCESO = 1;
    private static final Integer UPDATED_ID_MACRO_PROCESO = 2;

    private static final String DEFAULT_COD_DOC = "AAAAAAAAAA";
    private static final String UPDATED_COD_DOC = "BBBBBBBBBB";

    @Autowired
    private ProcesoRepository procesoRepository;

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

    private MockMvc restProcesoMockMvc;

    private Proceso proceso;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcesoResource procesoResource = new ProcesoResource(procesoRepository);
        this.restProcesoMockMvc = MockMvcBuilders.standaloneSetup(procesoResource)
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
    public static Proceso createEntity(EntityManager em) {
        Proceso proceso = new Proceso()
            .code(DEFAULT_CODE)
            .proceso(DEFAULT_PROCESO)
            .idMacroProceso(DEFAULT_ID_MACRO_PROCESO)
            .codDoc(DEFAULT_COD_DOC);
        return proceso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proceso createUpdatedEntity(EntityManager em) {
        Proceso proceso = new Proceso()
            .code(UPDATED_CODE)
            .proceso(UPDATED_PROCESO)
            .idMacroProceso(UPDATED_ID_MACRO_PROCESO)
            .codDoc(UPDATED_COD_DOC);
        return proceso;
    }

    @BeforeEach
    public void initTest() {
        proceso = createEntity(em);
    }

    @Test
    @Transactional
    public void createProceso() throws Exception {
        int databaseSizeBeforeCreate = procesoRepository.findAll().size();

        // Create the Proceso
        restProcesoMockMvc.perform(post("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proceso)))
            .andExpect(status().isCreated());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeCreate + 1);
        Proceso testProceso = procesoList.get(procesoList.size() - 1);
        assertThat(testProceso.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testProceso.getProceso()).isEqualTo(DEFAULT_PROCESO);
        assertThat(testProceso.getIdMacroProceso()).isEqualTo(DEFAULT_ID_MACRO_PROCESO);
        assertThat(testProceso.getCodDoc()).isEqualTo(DEFAULT_COD_DOC);
    }

    @Test
    @Transactional
    public void createProcesoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = procesoRepository.findAll().size();

        // Create the Proceso with an existing ID
        proceso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcesoMockMvc.perform(post("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proceso)))
            .andExpect(status().isBadRequest());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProcesos() throws Exception {
        // Initialize the database
        procesoRepository.saveAndFlush(proceso);

        // Get all the procesoList
        restProcesoMockMvc.perform(get("/api/procesos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proceso.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].proceso").value(hasItem(DEFAULT_PROCESO.toString())))
            .andExpect(jsonPath("$.[*].idMacroProceso").value(hasItem(DEFAULT_ID_MACRO_PROCESO)))
            .andExpect(jsonPath("$.[*].codDoc").value(hasItem(DEFAULT_COD_DOC.toString())));
    }
    
    @Test
    @Transactional
    public void getProceso() throws Exception {
        // Initialize the database
        procesoRepository.saveAndFlush(proceso);

        // Get the proceso
        restProcesoMockMvc.perform(get("/api/procesos/{id}", proceso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proceso.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.proceso").value(DEFAULT_PROCESO.toString()))
            .andExpect(jsonPath("$.idMacroProceso").value(DEFAULT_ID_MACRO_PROCESO))
            .andExpect(jsonPath("$.codDoc").value(DEFAULT_COD_DOC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProceso() throws Exception {
        // Get the proceso
        restProcesoMockMvc.perform(get("/api/procesos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProceso() throws Exception {
        // Initialize the database
        procesoRepository.saveAndFlush(proceso);

        int databaseSizeBeforeUpdate = procesoRepository.findAll().size();

        // Update the proceso
        Proceso updatedProceso = procesoRepository.findById(proceso.getId()).get();
        // Disconnect from session so that the updates on updatedProceso are not directly saved in db
        em.detach(updatedProceso);
        updatedProceso
            .code(UPDATED_CODE)
            .proceso(UPDATED_PROCESO)
            .idMacroProceso(UPDATED_ID_MACRO_PROCESO)
            .codDoc(UPDATED_COD_DOC);

        restProcesoMockMvc.perform(put("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProceso)))
            .andExpect(status().isOk());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeUpdate);
        Proceso testProceso = procesoList.get(procesoList.size() - 1);
        assertThat(testProceso.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testProceso.getProceso()).isEqualTo(UPDATED_PROCESO);
        assertThat(testProceso.getIdMacroProceso()).isEqualTo(UPDATED_ID_MACRO_PROCESO);
        assertThat(testProceso.getCodDoc()).isEqualTo(UPDATED_COD_DOC);
    }

    @Test
    @Transactional
    public void updateNonExistingProceso() throws Exception {
        int databaseSizeBeforeUpdate = procesoRepository.findAll().size();

        // Create the Proceso

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcesoMockMvc.perform(put("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proceso)))
            .andExpect(status().isBadRequest());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProceso() throws Exception {
        // Initialize the database
        procesoRepository.saveAndFlush(proceso);

        int databaseSizeBeforeDelete = procesoRepository.findAll().size();

        // Delete the proceso
        restProcesoMockMvc.perform(delete("/api/procesos/{id}", proceso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proceso.class);
        Proceso proceso1 = new Proceso();
        proceso1.setId(1L);
        Proceso proceso2 = new Proceso();
        proceso2.setId(proceso1.getId());
        assertThat(proceso1).isEqualTo(proceso2);
        proceso2.setId(2L);
        assertThat(proceso1).isNotEqualTo(proceso2);
        proceso1.setId(null);
        assertThat(proceso1).isNotEqualTo(proceso2);
    }
}
