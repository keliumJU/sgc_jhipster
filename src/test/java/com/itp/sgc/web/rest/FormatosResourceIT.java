package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.Formatos;
import com.itp.sgc.repository.FormatosRepository;
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
 * Integration tests for the {@Link FormatosResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class FormatosResourceIT {

    private static final String DEFAULT_NOM_FORMATO = "AAAAAAAAAA";
    private static final String UPDATED_NOM_FORMATO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_RUTA_FORMATO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RUTA_FORMATO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_RUTA_FORMATO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RUTA_FORMATO_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    @Autowired
    private FormatosRepository formatosRepository;

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

    private MockMvc restFormatosMockMvc;

    private Formatos formatos;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormatosResource formatosResource = new FormatosResource(formatosRepository);
        this.restFormatosMockMvc = MockMvcBuilders.standaloneSetup(formatosResource)
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
    public static Formatos createEntity(EntityManager em) {
        Formatos formatos = new Formatos()
            .nomFormato(DEFAULT_NOM_FORMATO)
            .rutaFormato(DEFAULT_RUTA_FORMATO)
            .rutaFormatoContentType(DEFAULT_RUTA_FORMATO_CONTENT_TYPE)
            .idDoc(DEFAULT_ID_DOC);
        return formatos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Formatos createUpdatedEntity(EntityManager em) {
        Formatos formatos = new Formatos()
            .nomFormato(UPDATED_NOM_FORMATO)
            .rutaFormato(UPDATED_RUTA_FORMATO)
            .rutaFormatoContentType(UPDATED_RUTA_FORMATO_CONTENT_TYPE)
            .idDoc(UPDATED_ID_DOC);
        return formatos;
    }

    @BeforeEach
    public void initTest() {
        formatos = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormatos() throws Exception {
        int databaseSizeBeforeCreate = formatosRepository.findAll().size();

        // Create the Formatos
        restFormatosMockMvc.perform(post("/api/formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formatos)))
            .andExpect(status().isCreated());

        // Validate the Formatos in the database
        List<Formatos> formatosList = formatosRepository.findAll();
        assertThat(formatosList).hasSize(databaseSizeBeforeCreate + 1);
        Formatos testFormatos = formatosList.get(formatosList.size() - 1);
        assertThat(testFormatos.getNomFormato()).isEqualTo(DEFAULT_NOM_FORMATO);
        assertThat(testFormatos.getRutaFormato()).isEqualTo(DEFAULT_RUTA_FORMATO);
        assertThat(testFormatos.getRutaFormatoContentType()).isEqualTo(DEFAULT_RUTA_FORMATO_CONTENT_TYPE);
        assertThat(testFormatos.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
    }

    @Test
    @Transactional
    public void createFormatosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formatosRepository.findAll().size();

        // Create the Formatos with an existing ID
        formatos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormatosMockMvc.perform(post("/api/formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formatos)))
            .andExpect(status().isBadRequest());

        // Validate the Formatos in the database
        List<Formatos> formatosList = formatosRepository.findAll();
        assertThat(formatosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFormatos() throws Exception {
        // Initialize the database
        formatosRepository.saveAndFlush(formatos);

        // Get all the formatosList
        restFormatosMockMvc.perform(get("/api/formatos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formatos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomFormato").value(hasItem(DEFAULT_NOM_FORMATO.toString())))
            .andExpect(jsonPath("$.[*].rutaFormatoContentType").value(hasItem(DEFAULT_RUTA_FORMATO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].rutaFormato").value(hasItem(Base64Utils.encodeToString(DEFAULT_RUTA_FORMATO))))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)));
    }
    
    @Test
    @Transactional
    public void getFormatos() throws Exception {
        // Initialize the database
        formatosRepository.saveAndFlush(formatos);

        // Get the formatos
        restFormatosMockMvc.perform(get("/api/formatos/{id}", formatos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(formatos.getId().intValue()))
            .andExpect(jsonPath("$.nomFormato").value(DEFAULT_NOM_FORMATO.toString()))
            .andExpect(jsonPath("$.rutaFormatoContentType").value(DEFAULT_RUTA_FORMATO_CONTENT_TYPE))
            .andExpect(jsonPath("$.rutaFormato").value(Base64Utils.encodeToString(DEFAULT_RUTA_FORMATO)))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC));
    }

    @Test
    @Transactional
    public void getNonExistingFormatos() throws Exception {
        // Get the formatos
        restFormatosMockMvc.perform(get("/api/formatos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormatos() throws Exception {
        // Initialize the database
        formatosRepository.saveAndFlush(formatos);

        int databaseSizeBeforeUpdate = formatosRepository.findAll().size();

        // Update the formatos
        Formatos updatedFormatos = formatosRepository.findById(formatos.getId()).get();
        // Disconnect from session so that the updates on updatedFormatos are not directly saved in db
        em.detach(updatedFormatos);
        updatedFormatos
            .nomFormato(UPDATED_NOM_FORMATO)
            .rutaFormato(UPDATED_RUTA_FORMATO)
            .rutaFormatoContentType(UPDATED_RUTA_FORMATO_CONTENT_TYPE)
            .idDoc(UPDATED_ID_DOC);

        restFormatosMockMvc.perform(put("/api/formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormatos)))
            .andExpect(status().isOk());

        // Validate the Formatos in the database
        List<Formatos> formatosList = formatosRepository.findAll();
        assertThat(formatosList).hasSize(databaseSizeBeforeUpdate);
        Formatos testFormatos = formatosList.get(formatosList.size() - 1);
        assertThat(testFormatos.getNomFormato()).isEqualTo(UPDATED_NOM_FORMATO);
        assertThat(testFormatos.getRutaFormato()).isEqualTo(UPDATED_RUTA_FORMATO);
        assertThat(testFormatos.getRutaFormatoContentType()).isEqualTo(UPDATED_RUTA_FORMATO_CONTENT_TYPE);
        assertThat(testFormatos.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
    }

    @Test
    @Transactional
    public void updateNonExistingFormatos() throws Exception {
        int databaseSizeBeforeUpdate = formatosRepository.findAll().size();

        // Create the Formatos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormatosMockMvc.perform(put("/api/formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formatos)))
            .andExpect(status().isBadRequest());

        // Validate the Formatos in the database
        List<Formatos> formatosList = formatosRepository.findAll();
        assertThat(formatosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormatos() throws Exception {
        // Initialize the database
        formatosRepository.saveAndFlush(formatos);

        int databaseSizeBeforeDelete = formatosRepository.findAll().size();

        // Delete the formatos
        restFormatosMockMvc.perform(delete("/api/formatos/{id}", formatos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Formatos> formatosList = formatosRepository.findAll();
        assertThat(formatosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Formatos.class);
        Formatos formatos1 = new Formatos();
        formatos1.setId(1L);
        Formatos formatos2 = new Formatos();
        formatos2.setId(formatos1.getId());
        assertThat(formatos1).isEqualTo(formatos2);
        formatos2.setId(2L);
        assertThat(formatos1).isNotEqualTo(formatos2);
        formatos1.setId(null);
        assertThat(formatos1).isNotEqualTo(formatos2);
    }
}
