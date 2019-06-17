package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.AjustarDoc;
import com.itp.sgc.repository.AjustarDocRepository;
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
 * Integration tests for the {@Link AjustarDocResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class AjustarDocResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_ID_USER = "AAAAAAAAAA";
    private static final String UPDATED_ID_USER = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_CARGO = 1;
    private static final Integer UPDATED_ID_CARGO = 2;

    private static final Integer DEFAULT_ID_ACCION = 1;
    private static final Integer UPDATED_ID_ACCION = 2;

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    @Autowired
    private AjustarDocRepository ajustarDocRepository;

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

    private MockMvc restAjustarDocMockMvc;

    private AjustarDoc ajustarDoc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AjustarDocResource ajustarDocResource = new AjustarDocResource(ajustarDocRepository);
        this.restAjustarDocMockMvc = MockMvcBuilders.standaloneSetup(ajustarDocResource)
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
    public static AjustarDoc createEntity(EntityManager em) {
        AjustarDoc ajustarDoc = new AjustarDoc()
            .code(DEFAULT_CODE)
            .idUser(DEFAULT_ID_USER)
            .idCargo(DEFAULT_ID_CARGO)
            .idAccion(DEFAULT_ID_ACCION)
            .idDoc(DEFAULT_ID_DOC);
        return ajustarDoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AjustarDoc createUpdatedEntity(EntityManager em) {
        AjustarDoc ajustarDoc = new AjustarDoc()
            .code(UPDATED_CODE)
            .idUser(UPDATED_ID_USER)
            .idCargo(UPDATED_ID_CARGO)
            .idAccion(UPDATED_ID_ACCION)
            .idDoc(UPDATED_ID_DOC);
        return ajustarDoc;
    }

    @BeforeEach
    public void initTest() {
        ajustarDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createAjustarDoc() throws Exception {
        int databaseSizeBeforeCreate = ajustarDocRepository.findAll().size();

        // Create the AjustarDoc
        restAjustarDocMockMvc.perform(post("/api/ajustar-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ajustarDoc)))
            .andExpect(status().isCreated());

        // Validate the AjustarDoc in the database
        List<AjustarDoc> ajustarDocList = ajustarDocRepository.findAll();
        assertThat(ajustarDocList).hasSize(databaseSizeBeforeCreate + 1);
        AjustarDoc testAjustarDoc = ajustarDocList.get(ajustarDocList.size() - 1);
        assertThat(testAjustarDoc.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testAjustarDoc.getIdUser()).isEqualTo(DEFAULT_ID_USER);
        assertThat(testAjustarDoc.getIdCargo()).isEqualTo(DEFAULT_ID_CARGO);
        assertThat(testAjustarDoc.getIdAccion()).isEqualTo(DEFAULT_ID_ACCION);
        assertThat(testAjustarDoc.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
    }

    @Test
    @Transactional
    public void createAjustarDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ajustarDocRepository.findAll().size();

        // Create the AjustarDoc with an existing ID
        ajustarDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAjustarDocMockMvc.perform(post("/api/ajustar-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ajustarDoc)))
            .andExpect(status().isBadRequest());

        // Validate the AjustarDoc in the database
        List<AjustarDoc> ajustarDocList = ajustarDocRepository.findAll();
        assertThat(ajustarDocList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAjustarDocs() throws Exception {
        // Initialize the database
        ajustarDocRepository.saveAndFlush(ajustarDoc);

        // Get all the ajustarDocList
        restAjustarDocMockMvc.perform(get("/api/ajustar-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ajustarDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].idUser").value(hasItem(DEFAULT_ID_USER.toString())))
            .andExpect(jsonPath("$.[*].idCargo").value(hasItem(DEFAULT_ID_CARGO)))
            .andExpect(jsonPath("$.[*].idAccion").value(hasItem(DEFAULT_ID_ACCION)))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)));
    }
    
    @Test
    @Transactional
    public void getAjustarDoc() throws Exception {
        // Initialize the database
        ajustarDocRepository.saveAndFlush(ajustarDoc);

        // Get the ajustarDoc
        restAjustarDocMockMvc.perform(get("/api/ajustar-docs/{id}", ajustarDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ajustarDoc.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.idUser").value(DEFAULT_ID_USER.toString()))
            .andExpect(jsonPath("$.idCargo").value(DEFAULT_ID_CARGO))
            .andExpect(jsonPath("$.idAccion").value(DEFAULT_ID_ACCION))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC));
    }

    @Test
    @Transactional
    public void getNonExistingAjustarDoc() throws Exception {
        // Get the ajustarDoc
        restAjustarDocMockMvc.perform(get("/api/ajustar-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAjustarDoc() throws Exception {
        // Initialize the database
        ajustarDocRepository.saveAndFlush(ajustarDoc);

        int databaseSizeBeforeUpdate = ajustarDocRepository.findAll().size();

        // Update the ajustarDoc
        AjustarDoc updatedAjustarDoc = ajustarDocRepository.findById(ajustarDoc.getId()).get();
        // Disconnect from session so that the updates on updatedAjustarDoc are not directly saved in db
        em.detach(updatedAjustarDoc);
        updatedAjustarDoc
            .code(UPDATED_CODE)
            .idUser(UPDATED_ID_USER)
            .idCargo(UPDATED_ID_CARGO)
            .idAccion(UPDATED_ID_ACCION)
            .idDoc(UPDATED_ID_DOC);

        restAjustarDocMockMvc.perform(put("/api/ajustar-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAjustarDoc)))
            .andExpect(status().isOk());

        // Validate the AjustarDoc in the database
        List<AjustarDoc> ajustarDocList = ajustarDocRepository.findAll();
        assertThat(ajustarDocList).hasSize(databaseSizeBeforeUpdate);
        AjustarDoc testAjustarDoc = ajustarDocList.get(ajustarDocList.size() - 1);
        assertThat(testAjustarDoc.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testAjustarDoc.getIdUser()).isEqualTo(UPDATED_ID_USER);
        assertThat(testAjustarDoc.getIdCargo()).isEqualTo(UPDATED_ID_CARGO);
        assertThat(testAjustarDoc.getIdAccion()).isEqualTo(UPDATED_ID_ACCION);
        assertThat(testAjustarDoc.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
    }

    @Test
    @Transactional
    public void updateNonExistingAjustarDoc() throws Exception {
        int databaseSizeBeforeUpdate = ajustarDocRepository.findAll().size();

        // Create the AjustarDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAjustarDocMockMvc.perform(put("/api/ajustar-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ajustarDoc)))
            .andExpect(status().isBadRequest());

        // Validate the AjustarDoc in the database
        List<AjustarDoc> ajustarDocList = ajustarDocRepository.findAll();
        assertThat(ajustarDocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAjustarDoc() throws Exception {
        // Initialize the database
        ajustarDocRepository.saveAndFlush(ajustarDoc);

        int databaseSizeBeforeDelete = ajustarDocRepository.findAll().size();

        // Delete the ajustarDoc
        restAjustarDocMockMvc.perform(delete("/api/ajustar-docs/{id}", ajustarDoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<AjustarDoc> ajustarDocList = ajustarDocRepository.findAll();
        assertThat(ajustarDocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AjustarDoc.class);
        AjustarDoc ajustarDoc1 = new AjustarDoc();
        ajustarDoc1.setId(1L);
        AjustarDoc ajustarDoc2 = new AjustarDoc();
        ajustarDoc2.setId(ajustarDoc1.getId());
        assertThat(ajustarDoc1).isEqualTo(ajustarDoc2);
        ajustarDoc2.setId(2L);
        assertThat(ajustarDoc1).isNotEqualTo(ajustarDoc2);
        ajustarDoc1.setId(null);
        assertThat(ajustarDoc1).isNotEqualTo(ajustarDoc2);
    }
}
