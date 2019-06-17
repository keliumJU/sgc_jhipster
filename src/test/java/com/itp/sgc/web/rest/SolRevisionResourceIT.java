package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.SolRevision;
import com.itp.sgc.repository.SolRevisionRepository;
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
 * Integration tests for the {@Link SolRevisionResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class SolRevisionResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final Integer DEFAULT_ID_USER = 1;
    private static final Integer UPDATED_ID_USER = 2;

    private static final Integer DEFAULT_ID_SOL = 1;
    private static final Integer UPDATED_ID_SOL = 2;

    private static final Boolean DEFAULT_ESTADO = false;
    private static final Boolean UPDATED_ESTADO = true;

    @Autowired
    private SolRevisionRepository solRevisionRepository;

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

    private MockMvc restSolRevisionMockMvc;

    private SolRevision solRevision;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolRevisionResource solRevisionResource = new SolRevisionResource(solRevisionRepository);
        this.restSolRevisionMockMvc = MockMvcBuilders.standaloneSetup(solRevisionResource)
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
    public static SolRevision createEntity(EntityManager em) {
        SolRevision solRevision = new SolRevision()
            .code(DEFAULT_CODE)
            .idUser(DEFAULT_ID_USER)
            .idSol(DEFAULT_ID_SOL)
            .estado(DEFAULT_ESTADO);
        return solRevision;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SolRevision createUpdatedEntity(EntityManager em) {
        SolRevision solRevision = new SolRevision()
            .code(UPDATED_CODE)
            .idUser(UPDATED_ID_USER)
            .idSol(UPDATED_ID_SOL)
            .estado(UPDATED_ESTADO);
        return solRevision;
    }

    @BeforeEach
    public void initTest() {
        solRevision = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolRevision() throws Exception {
        int databaseSizeBeforeCreate = solRevisionRepository.findAll().size();

        // Create the SolRevision
        restSolRevisionMockMvc.perform(post("/api/sol-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solRevision)))
            .andExpect(status().isCreated());

        // Validate the SolRevision in the database
        List<SolRevision> solRevisionList = solRevisionRepository.findAll();
        assertThat(solRevisionList).hasSize(databaseSizeBeforeCreate + 1);
        SolRevision testSolRevision = solRevisionList.get(solRevisionList.size() - 1);
        assertThat(testSolRevision.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testSolRevision.getIdUser()).isEqualTo(DEFAULT_ID_USER);
        assertThat(testSolRevision.getIdSol()).isEqualTo(DEFAULT_ID_SOL);
        assertThat(testSolRevision.isEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createSolRevisionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solRevisionRepository.findAll().size();

        // Create the SolRevision with an existing ID
        solRevision.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolRevisionMockMvc.perform(post("/api/sol-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solRevision)))
            .andExpect(status().isBadRequest());

        // Validate the SolRevision in the database
        List<SolRevision> solRevisionList = solRevisionRepository.findAll();
        assertThat(solRevisionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSolRevisions() throws Exception {
        // Initialize the database
        solRevisionRepository.saveAndFlush(solRevision);

        // Get all the solRevisionList
        restSolRevisionMockMvc.perform(get("/api/sol-revisions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solRevision.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].idUser").value(hasItem(DEFAULT_ID_USER)))
            .andExpect(jsonPath("$.[*].idSol").value(hasItem(DEFAULT_ID_SOL)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSolRevision() throws Exception {
        // Initialize the database
        solRevisionRepository.saveAndFlush(solRevision);

        // Get the solRevision
        restSolRevisionMockMvc.perform(get("/api/sol-revisions/{id}", solRevision.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solRevision.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.idUser").value(DEFAULT_ID_USER))
            .andExpect(jsonPath("$.idSol").value(DEFAULT_ID_SOL))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSolRevision() throws Exception {
        // Get the solRevision
        restSolRevisionMockMvc.perform(get("/api/sol-revisions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolRevision() throws Exception {
        // Initialize the database
        solRevisionRepository.saveAndFlush(solRevision);

        int databaseSizeBeforeUpdate = solRevisionRepository.findAll().size();

        // Update the solRevision
        SolRevision updatedSolRevision = solRevisionRepository.findById(solRevision.getId()).get();
        // Disconnect from session so that the updates on updatedSolRevision are not directly saved in db
        em.detach(updatedSolRevision);
        updatedSolRevision
            .code(UPDATED_CODE)
            .idUser(UPDATED_ID_USER)
            .idSol(UPDATED_ID_SOL)
            .estado(UPDATED_ESTADO);

        restSolRevisionMockMvc.perform(put("/api/sol-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolRevision)))
            .andExpect(status().isOk());

        // Validate the SolRevision in the database
        List<SolRevision> solRevisionList = solRevisionRepository.findAll();
        assertThat(solRevisionList).hasSize(databaseSizeBeforeUpdate);
        SolRevision testSolRevision = solRevisionList.get(solRevisionList.size() - 1);
        assertThat(testSolRevision.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testSolRevision.getIdUser()).isEqualTo(UPDATED_ID_USER);
        assertThat(testSolRevision.getIdSol()).isEqualTo(UPDATED_ID_SOL);
        assertThat(testSolRevision.isEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingSolRevision() throws Exception {
        int databaseSizeBeforeUpdate = solRevisionRepository.findAll().size();

        // Create the SolRevision

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolRevisionMockMvc.perform(put("/api/sol-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solRevision)))
            .andExpect(status().isBadRequest());

        // Validate the SolRevision in the database
        List<SolRevision> solRevisionList = solRevisionRepository.findAll();
        assertThat(solRevisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSolRevision() throws Exception {
        // Initialize the database
        solRevisionRepository.saveAndFlush(solRevision);

        int databaseSizeBeforeDelete = solRevisionRepository.findAll().size();

        // Delete the solRevision
        restSolRevisionMockMvc.perform(delete("/api/sol-revisions/{id}", solRevision.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<SolRevision> solRevisionList = solRevisionRepository.findAll();
        assertThat(solRevisionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolRevision.class);
        SolRevision solRevision1 = new SolRevision();
        solRevision1.setId(1L);
        SolRevision solRevision2 = new SolRevision();
        solRevision2.setId(solRevision1.getId());
        assertThat(solRevision1).isEqualTo(solRevision2);
        solRevision2.setId(2L);
        assertThat(solRevision1).isNotEqualTo(solRevision2);
        solRevision1.setId(null);
        assertThat(solRevision1).isNotEqualTo(solRevision2);
    }
}
