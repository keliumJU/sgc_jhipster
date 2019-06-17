package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.DocumentoSGC;
import com.itp.sgc.repository.DocumentoSGCRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.itp.sgc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link DocumentoSGCResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class DocumentoSGCResourceIT {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    private static final Integer DEFAULT_ID_PROCESO = 1;
    private static final Integer UPDATED_ID_PROCESO = 2;

    private static final Integer DEFAULT_ID_TIPO_DOC = 1;
    private static final Integer UPDATED_ID_TIPO_DOC = 2;

    private static final String DEFAULT_NOM_DOC = "AAAAAAAAAA";
    private static final String UPDATED_NOM_DOC = "BBBBBBBBBB";

    private static final byte[] DEFAULT_RUTA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RUTA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_RUTA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RUTA_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_ID_ESTADO = 1;
    private static final Integer UPDATED_ID_ESTADO = 2;

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    @Autowired
    private DocumentoSGCRepository documentoSGCRepository;

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

    private MockMvc restDocumentoSGCMockMvc;

    private DocumentoSGC documentoSGC;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentoSGCResource documentoSGCResource = new DocumentoSGCResource(documentoSGCRepository);
        this.restDocumentoSGCMockMvc = MockMvcBuilders.standaloneSetup(documentoSGCResource)
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
    public static DocumentoSGC createEntity(EntityManager em) {
        DocumentoSGC documentoSGC = new DocumentoSGC()
            .codigo(DEFAULT_CODIGO)
            .idProceso(DEFAULT_ID_PROCESO)
            .idTipoDoc(DEFAULT_ID_TIPO_DOC)
            .nomDoc(DEFAULT_NOM_DOC)
            .ruta(DEFAULT_RUTA)
            .rutaContentType(DEFAULT_RUTA_CONTENT_TYPE)
            .idEstado(DEFAULT_ID_ESTADO)
            .version(DEFAULT_VERSION);
        return documentoSGC;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentoSGC createUpdatedEntity(EntityManager em) {
        DocumentoSGC documentoSGC = new DocumentoSGC()
            .codigo(UPDATED_CODIGO)
            .idProceso(UPDATED_ID_PROCESO)
            .idTipoDoc(UPDATED_ID_TIPO_DOC)
            .nomDoc(UPDATED_NOM_DOC)
            .ruta(UPDATED_RUTA)
            .rutaContentType(UPDATED_RUTA_CONTENT_TYPE)
            .idEstado(UPDATED_ID_ESTADO)
            .version(UPDATED_VERSION);
        return documentoSGC;
    }

    @BeforeEach
    public void initTest() {
        documentoSGC = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentoSGC() throws Exception {
        int databaseSizeBeforeCreate = documentoSGCRepository.findAll().size();

        // Create the DocumentoSGC
        restDocumentoSGCMockMvc.perform(post("/api/documento-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentoSGC)))
            .andExpect(status().isCreated());

        // Validate the DocumentoSGC in the database
        List<DocumentoSGC> documentoSGCList = documentoSGCRepository.findAll();
        assertThat(documentoSGCList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentoSGC testDocumentoSGC = documentoSGCList.get(documentoSGCList.size() - 1);
        assertThat(testDocumentoSGC.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testDocumentoSGC.getIdProceso()).isEqualTo(DEFAULT_ID_PROCESO);
        assertThat(testDocumentoSGC.getIdTipoDoc()).isEqualTo(DEFAULT_ID_TIPO_DOC);
        assertThat(testDocumentoSGC.getNomDoc()).isEqualTo(DEFAULT_NOM_DOC);
        assertThat(testDocumentoSGC.getRuta()).isEqualTo(DEFAULT_RUTA);
        assertThat(testDocumentoSGC.getRutaContentType()).isEqualTo(DEFAULT_RUTA_CONTENT_TYPE);
        assertThat(testDocumentoSGC.getIdEstado()).isEqualTo(DEFAULT_ID_ESTADO);
        assertThat(testDocumentoSGC.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    public void createDocumentoSGCWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentoSGCRepository.findAll().size();

        // Create the DocumentoSGC with an existing ID
        documentoSGC.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentoSGCMockMvc.perform(post("/api/documento-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentoSGC)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentoSGC in the database
        List<DocumentoSGC> documentoSGCList = documentoSGCRepository.findAll();
        assertThat(documentoSGCList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomDocIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentoSGCRepository.findAll().size();
        // set the field null
        documentoSGC.setNomDoc(null);

        // Create the DocumentoSGC, which fails.

        restDocumentoSGCMockMvc.perform(post("/api/documento-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentoSGC)))
            .andExpect(status().isBadRequest());

        List<DocumentoSGC> documentoSGCList = documentoSGCRepository.findAll();
        assertThat(documentoSGCList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDocumentoSGCS() throws Exception {
        // Initialize the database
        documentoSGCRepository.saveAndFlush(documentoSGC);

        // Get all the documentoSGCList
        restDocumentoSGCMockMvc.perform(get("/api/documento-sgcs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentoSGC.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].idProceso").value(hasItem(DEFAULT_ID_PROCESO)))
            .andExpect(jsonPath("$.[*].idTipoDoc").value(hasItem(DEFAULT_ID_TIPO_DOC)))
            .andExpect(jsonPath("$.[*].nomDoc").value(hasItem(DEFAULT_NOM_DOC.toString())))
            .andExpect(jsonPath("$.[*].rutaContentType").value(hasItem(DEFAULT_RUTA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].ruta").value(hasItem(Base64Utils.encodeToString(DEFAULT_RUTA))))
            .andExpect(jsonPath("$.[*].idEstado").value(hasItem(DEFAULT_ID_ESTADO)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)));
    }
    
    @Test
    @Transactional
    public void getDocumentoSGC() throws Exception {
        // Initialize the database
        documentoSGCRepository.saveAndFlush(documentoSGC);

        // Get the documentoSGC
        restDocumentoSGCMockMvc.perform(get("/api/documento-sgcs/{id}", documentoSGC.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentoSGC.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.idProceso").value(DEFAULT_ID_PROCESO))
            .andExpect(jsonPath("$.idTipoDoc").value(DEFAULT_ID_TIPO_DOC))
            .andExpect(jsonPath("$.nomDoc").value(DEFAULT_NOM_DOC.toString()))
            .andExpect(jsonPath("$.rutaContentType").value(DEFAULT_RUTA_CONTENT_TYPE))
            .andExpect(jsonPath("$.ruta").value(Base64Utils.encodeToString(DEFAULT_RUTA)))
            .andExpect(jsonPath("$.idEstado").value(DEFAULT_ID_ESTADO))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentoSGC() throws Exception {
        // Get the documentoSGC
        restDocumentoSGCMockMvc.perform(get("/api/documento-sgcs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentoSGC() throws Exception {
        // Initialize the database
        documentoSGCRepository.saveAndFlush(documentoSGC);

        int databaseSizeBeforeUpdate = documentoSGCRepository.findAll().size();

        // Update the documentoSGC
        DocumentoSGC updatedDocumentoSGC = documentoSGCRepository.findById(documentoSGC.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentoSGC are not directly saved in db
        em.detach(updatedDocumentoSGC);
        updatedDocumentoSGC
            .codigo(UPDATED_CODIGO)
            .idProceso(UPDATED_ID_PROCESO)
            .idTipoDoc(UPDATED_ID_TIPO_DOC)
            .nomDoc(UPDATED_NOM_DOC)
            .ruta(UPDATED_RUTA)
            .rutaContentType(UPDATED_RUTA_CONTENT_TYPE)
            .idEstado(UPDATED_ID_ESTADO)
            .version(UPDATED_VERSION);

        restDocumentoSGCMockMvc.perform(put("/api/documento-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentoSGC)))
            .andExpect(status().isOk());

        // Validate the DocumentoSGC in the database
        List<DocumentoSGC> documentoSGCList = documentoSGCRepository.findAll();
        assertThat(documentoSGCList).hasSize(databaseSizeBeforeUpdate);
        DocumentoSGC testDocumentoSGC = documentoSGCList.get(documentoSGCList.size() - 1);
        assertThat(testDocumentoSGC.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testDocumentoSGC.getIdProceso()).isEqualTo(UPDATED_ID_PROCESO);
        assertThat(testDocumentoSGC.getIdTipoDoc()).isEqualTo(UPDATED_ID_TIPO_DOC);
        assertThat(testDocumentoSGC.getNomDoc()).isEqualTo(UPDATED_NOM_DOC);
        assertThat(testDocumentoSGC.getRuta()).isEqualTo(UPDATED_RUTA);
        assertThat(testDocumentoSGC.getRutaContentType()).isEqualTo(UPDATED_RUTA_CONTENT_TYPE);
        assertThat(testDocumentoSGC.getIdEstado()).isEqualTo(UPDATED_ID_ESTADO);
        assertThat(testDocumentoSGC.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentoSGC() throws Exception {
        int databaseSizeBeforeUpdate = documentoSGCRepository.findAll().size();

        // Create the DocumentoSGC

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentoSGCMockMvc.perform(put("/api/documento-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentoSGC)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentoSGC in the database
        List<DocumentoSGC> documentoSGCList = documentoSGCRepository.findAll();
        assertThat(documentoSGCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentoSGC() throws Exception {
        // Initialize the database
        documentoSGCRepository.saveAndFlush(documentoSGC);

        int databaseSizeBeforeDelete = documentoSGCRepository.findAll().size();

        // Delete the documentoSGC
        restDocumentoSGCMockMvc.perform(delete("/api/documento-sgcs/{id}", documentoSGC.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<DocumentoSGC> documentoSGCList = documentoSGCRepository.findAll();
        assertThat(documentoSGCList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentoSGC.class);
        DocumentoSGC documentoSGC1 = new DocumentoSGC();
        documentoSGC1.setId(1L);
        DocumentoSGC documentoSGC2 = new DocumentoSGC();
        documentoSGC2.setId(documentoSGC1.getId());
        assertThat(documentoSGC1).isEqualTo(documentoSGC2);
        documentoSGC2.setId(2L);
        assertThat(documentoSGC1).isNotEqualTo(documentoSGC2);
        documentoSGC1.setId(null);
        assertThat(documentoSGC1).isNotEqualTo(documentoSGC2);
    }
}
