package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.TipoDoc;
import com.itp.sgc.repository.TipoDocRepository;
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
 * Integration tests for the {@Link TipoDocResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class TipoDocResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_TIPO_DOC = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_DOC = "BBBBBBBBBB";

    private static final String DEFAULT_COD_TIP = "AAAAAAAAAA";
    private static final String UPDATED_COD_TIP = "BBBBBBBBBB";

    @Autowired
    private TipoDocRepository tipoDocRepository;

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

    private MockMvc restTipoDocMockMvc;

    private TipoDoc tipoDoc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoDocResource tipoDocResource = new TipoDocResource(tipoDocRepository);
        this.restTipoDocMockMvc = MockMvcBuilders.standaloneSetup(tipoDocResource)
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
    public static TipoDoc createEntity(EntityManager em) {
        TipoDoc tipoDoc = new TipoDoc()
            .code(DEFAULT_CODE)
            .tipoDoc(DEFAULT_TIPO_DOC)
            .codTip(DEFAULT_COD_TIP);
        return tipoDoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDoc createUpdatedEntity(EntityManager em) {
        TipoDoc tipoDoc = new TipoDoc()
            .code(UPDATED_CODE)
            .tipoDoc(UPDATED_TIPO_DOC)
            .codTip(UPDATED_COD_TIP);
        return tipoDoc;
    }

    @BeforeEach
    public void initTest() {
        tipoDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoDoc() throws Exception {
        int databaseSizeBeforeCreate = tipoDocRepository.findAll().size();

        // Create the TipoDoc
        restTipoDocMockMvc.perform(post("/api/tipo-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoDoc)))
            .andExpect(status().isCreated());

        // Validate the TipoDoc in the database
        List<TipoDoc> tipoDocList = tipoDocRepository.findAll();
        assertThat(tipoDocList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDoc testTipoDoc = tipoDocList.get(tipoDocList.size() - 1);
        assertThat(testTipoDoc.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTipoDoc.getTipoDoc()).isEqualTo(DEFAULT_TIPO_DOC);
        assertThat(testTipoDoc.getCodTip()).isEqualTo(DEFAULT_COD_TIP);
    }

    @Test
    @Transactional
    public void createTipoDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoDocRepository.findAll().size();

        // Create the TipoDoc with an existing ID
        tipoDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDocMockMvc.perform(post("/api/tipo-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoDoc)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDoc in the database
        List<TipoDoc> tipoDocList = tipoDocRepository.findAll();
        assertThat(tipoDocList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoDocs() throws Exception {
        // Initialize the database
        tipoDocRepository.saveAndFlush(tipoDoc);

        // Get all the tipoDocList
        restTipoDocMockMvc.perform(get("/api/tipo-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].tipoDoc").value(hasItem(DEFAULT_TIPO_DOC.toString())))
            .andExpect(jsonPath("$.[*].codTip").value(hasItem(DEFAULT_COD_TIP.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoDoc() throws Exception {
        // Initialize the database
        tipoDocRepository.saveAndFlush(tipoDoc);

        // Get the tipoDoc
        restTipoDocMockMvc.perform(get("/api/tipo-docs/{id}", tipoDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDoc.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.tipoDoc").value(DEFAULT_TIPO_DOC.toString()))
            .andExpect(jsonPath("$.codTip").value(DEFAULT_COD_TIP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoDoc() throws Exception {
        // Get the tipoDoc
        restTipoDocMockMvc.perform(get("/api/tipo-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoDoc() throws Exception {
        // Initialize the database
        tipoDocRepository.saveAndFlush(tipoDoc);

        int databaseSizeBeforeUpdate = tipoDocRepository.findAll().size();

        // Update the tipoDoc
        TipoDoc updatedTipoDoc = tipoDocRepository.findById(tipoDoc.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDoc are not directly saved in db
        em.detach(updatedTipoDoc);
        updatedTipoDoc
            .code(UPDATED_CODE)
            .tipoDoc(UPDATED_TIPO_DOC)
            .codTip(UPDATED_COD_TIP);

        restTipoDocMockMvc.perform(put("/api/tipo-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoDoc)))
            .andExpect(status().isOk());

        // Validate the TipoDoc in the database
        List<TipoDoc> tipoDocList = tipoDocRepository.findAll();
        assertThat(tipoDocList).hasSize(databaseSizeBeforeUpdate);
        TipoDoc testTipoDoc = tipoDocList.get(tipoDocList.size() - 1);
        assertThat(testTipoDoc.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTipoDoc.getTipoDoc()).isEqualTo(UPDATED_TIPO_DOC);
        assertThat(testTipoDoc.getCodTip()).isEqualTo(UPDATED_COD_TIP);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoDoc() throws Exception {
        int databaseSizeBeforeUpdate = tipoDocRepository.findAll().size();

        // Create the TipoDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDocMockMvc.perform(put("/api/tipo-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoDoc)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDoc in the database
        List<TipoDoc> tipoDocList = tipoDocRepository.findAll();
        assertThat(tipoDocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoDoc() throws Exception {
        // Initialize the database
        tipoDocRepository.saveAndFlush(tipoDoc);

        int databaseSizeBeforeDelete = tipoDocRepository.findAll().size();

        // Delete the tipoDoc
        restTipoDocMockMvc.perform(delete("/api/tipo-docs/{id}", tipoDoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TipoDoc> tipoDocList = tipoDocRepository.findAll();
        assertThat(tipoDocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDoc.class);
        TipoDoc tipoDoc1 = new TipoDoc();
        tipoDoc1.setId(1L);
        TipoDoc tipoDoc2 = new TipoDoc();
        tipoDoc2.setId(tipoDoc1.getId());
        assertThat(tipoDoc1).isEqualTo(tipoDoc2);
        tipoDoc2.setId(2L);
        assertThat(tipoDoc1).isNotEqualTo(tipoDoc2);
        tipoDoc1.setId(null);
        assertThat(tipoDoc1).isNotEqualTo(tipoDoc2);
    }
}
