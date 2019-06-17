package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.EstadoDoc;
import com.itp.sgc.repository.EstadoDocRepository;
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
 * Integration tests for the {@Link EstadoDocResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class EstadoDocResourceIT {

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoDocRepository estadoDocRepository;

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

    private MockMvc restEstadoDocMockMvc;

    private EstadoDoc estadoDoc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoDocResource estadoDocResource = new EstadoDocResource(estadoDocRepository);
        this.restEstadoDocMockMvc = MockMvcBuilders.standaloneSetup(estadoDocResource)
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
    public static EstadoDoc createEntity(EntityManager em) {
        EstadoDoc estadoDoc = new EstadoDoc()
            .estado(DEFAULT_ESTADO);
        return estadoDoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoDoc createUpdatedEntity(EntityManager em) {
        EstadoDoc estadoDoc = new EstadoDoc()
            .estado(UPDATED_ESTADO);
        return estadoDoc;
    }

    @BeforeEach
    public void initTest() {
        estadoDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoDoc() throws Exception {
        int databaseSizeBeforeCreate = estadoDocRepository.findAll().size();

        // Create the EstadoDoc
        restEstadoDocMockMvc.perform(post("/api/estado-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoDoc)))
            .andExpect(status().isCreated());

        // Validate the EstadoDoc in the database
        List<EstadoDoc> estadoDocList = estadoDocRepository.findAll();
        assertThat(estadoDocList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoDoc testEstadoDoc = estadoDocList.get(estadoDocList.size() - 1);
        assertThat(testEstadoDoc.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoDocRepository.findAll().size();

        // Create the EstadoDoc with an existing ID
        estadoDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoDocMockMvc.perform(post("/api/estado-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoDoc)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoDoc in the database
        List<EstadoDoc> estadoDocList = estadoDocRepository.findAll();
        assertThat(estadoDocList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstadoDocs() throws Exception {
        // Initialize the database
        estadoDocRepository.saveAndFlush(estadoDoc);

        // Get all the estadoDocList
        restEstadoDocMockMvc.perform(get("/api/estado-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getEstadoDoc() throws Exception {
        // Initialize the database
        estadoDocRepository.saveAndFlush(estadoDoc);

        // Get the estadoDoc
        restEstadoDocMockMvc.perform(get("/api/estado-docs/{id}", estadoDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoDoc.getId().intValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoDoc() throws Exception {
        // Get the estadoDoc
        restEstadoDocMockMvc.perform(get("/api/estado-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoDoc() throws Exception {
        // Initialize the database
        estadoDocRepository.saveAndFlush(estadoDoc);

        int databaseSizeBeforeUpdate = estadoDocRepository.findAll().size();

        // Update the estadoDoc
        EstadoDoc updatedEstadoDoc = estadoDocRepository.findById(estadoDoc.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoDoc are not directly saved in db
        em.detach(updatedEstadoDoc);
        updatedEstadoDoc
            .estado(UPDATED_ESTADO);

        restEstadoDocMockMvc.perform(put("/api/estado-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoDoc)))
            .andExpect(status().isOk());

        // Validate the EstadoDoc in the database
        List<EstadoDoc> estadoDocList = estadoDocRepository.findAll();
        assertThat(estadoDocList).hasSize(databaseSizeBeforeUpdate);
        EstadoDoc testEstadoDoc = estadoDocList.get(estadoDocList.size() - 1);
        assertThat(testEstadoDoc.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoDoc() throws Exception {
        int databaseSizeBeforeUpdate = estadoDocRepository.findAll().size();

        // Create the EstadoDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoDocMockMvc.perform(put("/api/estado-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoDoc)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoDoc in the database
        List<EstadoDoc> estadoDocList = estadoDocRepository.findAll();
        assertThat(estadoDocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoDoc() throws Exception {
        // Initialize the database
        estadoDocRepository.saveAndFlush(estadoDoc);

        int databaseSizeBeforeDelete = estadoDocRepository.findAll().size();

        // Delete the estadoDoc
        restEstadoDocMockMvc.perform(delete("/api/estado-docs/{id}", estadoDoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<EstadoDoc> estadoDocList = estadoDocRepository.findAll();
        assertThat(estadoDocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoDoc.class);
        EstadoDoc estadoDoc1 = new EstadoDoc();
        estadoDoc1.setId(1L);
        EstadoDoc estadoDoc2 = new EstadoDoc();
        estadoDoc2.setId(estadoDoc1.getId());
        assertThat(estadoDoc1).isEqualTo(estadoDoc2);
        estadoDoc2.setId(2L);
        assertThat(estadoDoc1).isNotEqualTo(estadoDoc2);
        estadoDoc1.setId(null);
        assertThat(estadoDoc1).isNotEqualTo(estadoDoc2);
    }
}
