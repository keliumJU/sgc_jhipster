package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.DocRevision;
import com.itp.sgc.repository.DocRevisionRepository;
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
 * Integration tests for the {@Link DocRevisionResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class DocRevisionResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_ID_USER = "AAAAAAAAAA";
    private static final String UPDATED_ID_USER = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    private static final String DEFAULT_COMENTARIO_1 = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIO_1 = "BBBBBBBBBB";

    private static final String DEFAULT_COMENTARIO_2 = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIO_2 = "BBBBBBBBBB";

    @Autowired
    private DocRevisionRepository docRevisionRepository;

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

    private MockMvc restDocRevisionMockMvc;

    private DocRevision docRevision;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocRevisionResource docRevisionResource = new DocRevisionResource(docRevisionRepository);
        this.restDocRevisionMockMvc = MockMvcBuilders.standaloneSetup(docRevisionResource)
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
    public static DocRevision createEntity(EntityManager em) {
        DocRevision docRevision = new DocRevision()
            .code(DEFAULT_CODE)
            .idUser(DEFAULT_ID_USER)
            .idDoc(DEFAULT_ID_DOC)
            .comentario1(DEFAULT_COMENTARIO_1)
            .comentario2(DEFAULT_COMENTARIO_2);
        return docRevision;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocRevision createUpdatedEntity(EntityManager em) {
        DocRevision docRevision = new DocRevision()
            .code(UPDATED_CODE)
            .idUser(UPDATED_ID_USER)
            .idDoc(UPDATED_ID_DOC)
            .comentario1(UPDATED_COMENTARIO_1)
            .comentario2(UPDATED_COMENTARIO_2);
        return docRevision;
    }

    @BeforeEach
    public void initTest() {
        docRevision = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocRevision() throws Exception {
        int databaseSizeBeforeCreate = docRevisionRepository.findAll().size();

        // Create the DocRevision
        restDocRevisionMockMvc.perform(post("/api/doc-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(docRevision)))
            .andExpect(status().isCreated());

        // Validate the DocRevision in the database
        List<DocRevision> docRevisionList = docRevisionRepository.findAll();
        assertThat(docRevisionList).hasSize(databaseSizeBeforeCreate + 1);
        DocRevision testDocRevision = docRevisionList.get(docRevisionList.size() - 1);
        assertThat(testDocRevision.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testDocRevision.getIdUser()).isEqualTo(DEFAULT_ID_USER);
        assertThat(testDocRevision.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
        assertThat(testDocRevision.getComentario1()).isEqualTo(DEFAULT_COMENTARIO_1);
        assertThat(testDocRevision.getComentario2()).isEqualTo(DEFAULT_COMENTARIO_2);
    }

    @Test
    @Transactional
    public void createDocRevisionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = docRevisionRepository.findAll().size();

        // Create the DocRevision with an existing ID
        docRevision.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocRevisionMockMvc.perform(post("/api/doc-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(docRevision)))
            .andExpect(status().isBadRequest());

        // Validate the DocRevision in the database
        List<DocRevision> docRevisionList = docRevisionRepository.findAll();
        assertThat(docRevisionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDocRevisions() throws Exception {
        // Initialize the database
        docRevisionRepository.saveAndFlush(docRevision);

        // Get all the docRevisionList
        restDocRevisionMockMvc.perform(get("/api/doc-revisions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(docRevision.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].idUser").value(hasItem(DEFAULT_ID_USER.toString())))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)))
            .andExpect(jsonPath("$.[*].comentario1").value(hasItem(DEFAULT_COMENTARIO_1.toString())))
            .andExpect(jsonPath("$.[*].comentario2").value(hasItem(DEFAULT_COMENTARIO_2.toString())));
    }
    
    @Test
    @Transactional
    public void getDocRevision() throws Exception {
        // Initialize the database
        docRevisionRepository.saveAndFlush(docRevision);

        // Get the docRevision
        restDocRevisionMockMvc.perform(get("/api/doc-revisions/{id}", docRevision.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(docRevision.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.idUser").value(DEFAULT_ID_USER.toString()))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC))
            .andExpect(jsonPath("$.comentario1").value(DEFAULT_COMENTARIO_1.toString()))
            .andExpect(jsonPath("$.comentario2").value(DEFAULT_COMENTARIO_2.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocRevision() throws Exception {
        // Get the docRevision
        restDocRevisionMockMvc.perform(get("/api/doc-revisions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocRevision() throws Exception {
        // Initialize the database
        docRevisionRepository.saveAndFlush(docRevision);

        int databaseSizeBeforeUpdate = docRevisionRepository.findAll().size();

        // Update the docRevision
        DocRevision updatedDocRevision = docRevisionRepository.findById(docRevision.getId()).get();
        // Disconnect from session so that the updates on updatedDocRevision are not directly saved in db
        em.detach(updatedDocRevision);
        updatedDocRevision
            .code(UPDATED_CODE)
            .idUser(UPDATED_ID_USER)
            .idDoc(UPDATED_ID_DOC)
            .comentario1(UPDATED_COMENTARIO_1)
            .comentario2(UPDATED_COMENTARIO_2);

        restDocRevisionMockMvc.perform(put("/api/doc-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocRevision)))
            .andExpect(status().isOk());

        // Validate the DocRevision in the database
        List<DocRevision> docRevisionList = docRevisionRepository.findAll();
        assertThat(docRevisionList).hasSize(databaseSizeBeforeUpdate);
        DocRevision testDocRevision = docRevisionList.get(docRevisionList.size() - 1);
        assertThat(testDocRevision.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testDocRevision.getIdUser()).isEqualTo(UPDATED_ID_USER);
        assertThat(testDocRevision.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
        assertThat(testDocRevision.getComentario1()).isEqualTo(UPDATED_COMENTARIO_1);
        assertThat(testDocRevision.getComentario2()).isEqualTo(UPDATED_COMENTARIO_2);
    }

    @Test
    @Transactional
    public void updateNonExistingDocRevision() throws Exception {
        int databaseSizeBeforeUpdate = docRevisionRepository.findAll().size();

        // Create the DocRevision

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocRevisionMockMvc.perform(put("/api/doc-revisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(docRevision)))
            .andExpect(status().isBadRequest());

        // Validate the DocRevision in the database
        List<DocRevision> docRevisionList = docRevisionRepository.findAll();
        assertThat(docRevisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocRevision() throws Exception {
        // Initialize the database
        docRevisionRepository.saveAndFlush(docRevision);

        int databaseSizeBeforeDelete = docRevisionRepository.findAll().size();

        // Delete the docRevision
        restDocRevisionMockMvc.perform(delete("/api/doc-revisions/{id}", docRevision.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<DocRevision> docRevisionList = docRevisionRepository.findAll();
        assertThat(docRevisionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocRevision.class);
        DocRevision docRevision1 = new DocRevision();
        docRevision1.setId(1L);
        DocRevision docRevision2 = new DocRevision();
        docRevision2.setId(docRevision1.getId());
        assertThat(docRevision1).isEqualTo(docRevision2);
        docRevision2.setId(2L);
        assertThat(docRevision1).isNotEqualTo(docRevision2);
        docRevision1.setId(null);
        assertThat(docRevision1).isNotEqualTo(docRevision2);
    }
}
