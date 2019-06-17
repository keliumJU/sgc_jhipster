package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.VersionFormatos;
import com.itp.sgc.repository.VersionFormatosRepository;
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
 * Integration tests for the {@Link VersionFormatosResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class VersionFormatosResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final Integer DEFAULT_ID_FORMATO = 1;
    private static final Integer UPDATED_ID_FORMATO = 2;

    private static final byte[] DEFAULT_RUTA_FORMATO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RUTA_FORMATO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_RUTA_FORMATO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RUTA_FORMATO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_NOM_FORMATO = "AAAAAAAAAA";
    private static final String UPDATED_NOM_FORMATO = "BBBBBBBBBB";

    @Autowired
    private VersionFormatosRepository versionFormatosRepository;

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

    private MockMvc restVersionFormatosMockMvc;

    private VersionFormatos versionFormatos;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VersionFormatosResource versionFormatosResource = new VersionFormatosResource(versionFormatosRepository);
        this.restVersionFormatosMockMvc = MockMvcBuilders.standaloneSetup(versionFormatosResource)
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
    public static VersionFormatos createEntity(EntityManager em) {
        VersionFormatos versionFormatos = new VersionFormatos()
            .code(DEFAULT_CODE)
            .idFormato(DEFAULT_ID_FORMATO)
            .rutaFormato(DEFAULT_RUTA_FORMATO)
            .rutaFormatoContentType(DEFAULT_RUTA_FORMATO_CONTENT_TYPE)
            .nomFormato(DEFAULT_NOM_FORMATO);
        return versionFormatos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VersionFormatos createUpdatedEntity(EntityManager em) {
        VersionFormatos versionFormatos = new VersionFormatos()
            .code(UPDATED_CODE)
            .idFormato(UPDATED_ID_FORMATO)
            .rutaFormato(UPDATED_RUTA_FORMATO)
            .rutaFormatoContentType(UPDATED_RUTA_FORMATO_CONTENT_TYPE)
            .nomFormato(UPDATED_NOM_FORMATO);
        return versionFormatos;
    }

    @BeforeEach
    public void initTest() {
        versionFormatos = createEntity(em);
    }

    @Test
    @Transactional
    public void createVersionFormatos() throws Exception {
        int databaseSizeBeforeCreate = versionFormatosRepository.findAll().size();

        // Create the VersionFormatos
        restVersionFormatosMockMvc.perform(post("/api/version-formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionFormatos)))
            .andExpect(status().isCreated());

        // Validate the VersionFormatos in the database
        List<VersionFormatos> versionFormatosList = versionFormatosRepository.findAll();
        assertThat(versionFormatosList).hasSize(databaseSizeBeforeCreate + 1);
        VersionFormatos testVersionFormatos = versionFormatosList.get(versionFormatosList.size() - 1);
        assertThat(testVersionFormatos.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testVersionFormatos.getIdFormato()).isEqualTo(DEFAULT_ID_FORMATO);
        assertThat(testVersionFormatos.getRutaFormato()).isEqualTo(DEFAULT_RUTA_FORMATO);
        assertThat(testVersionFormatos.getRutaFormatoContentType()).isEqualTo(DEFAULT_RUTA_FORMATO_CONTENT_TYPE);
        assertThat(testVersionFormatos.getNomFormato()).isEqualTo(DEFAULT_NOM_FORMATO);
    }

    @Test
    @Transactional
    public void createVersionFormatosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = versionFormatosRepository.findAll().size();

        // Create the VersionFormatos with an existing ID
        versionFormatos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVersionFormatosMockMvc.perform(post("/api/version-formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionFormatos)))
            .andExpect(status().isBadRequest());

        // Validate the VersionFormatos in the database
        List<VersionFormatos> versionFormatosList = versionFormatosRepository.findAll();
        assertThat(versionFormatosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVersionFormatos() throws Exception {
        // Initialize the database
        versionFormatosRepository.saveAndFlush(versionFormatos);

        // Get all the versionFormatosList
        restVersionFormatosMockMvc.perform(get("/api/version-formatos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(versionFormatos.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].idFormato").value(hasItem(DEFAULT_ID_FORMATO)))
            .andExpect(jsonPath("$.[*].rutaFormatoContentType").value(hasItem(DEFAULT_RUTA_FORMATO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].rutaFormato").value(hasItem(Base64Utils.encodeToString(DEFAULT_RUTA_FORMATO))))
            .andExpect(jsonPath("$.[*].nomFormato").value(hasItem(DEFAULT_NOM_FORMATO.toString())));
    }
    
    @Test
    @Transactional
    public void getVersionFormatos() throws Exception {
        // Initialize the database
        versionFormatosRepository.saveAndFlush(versionFormatos);

        // Get the versionFormatos
        restVersionFormatosMockMvc.perform(get("/api/version-formatos/{id}", versionFormatos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(versionFormatos.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.idFormato").value(DEFAULT_ID_FORMATO))
            .andExpect(jsonPath("$.rutaFormatoContentType").value(DEFAULT_RUTA_FORMATO_CONTENT_TYPE))
            .andExpect(jsonPath("$.rutaFormato").value(Base64Utils.encodeToString(DEFAULT_RUTA_FORMATO)))
            .andExpect(jsonPath("$.nomFormato").value(DEFAULT_NOM_FORMATO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVersionFormatos() throws Exception {
        // Get the versionFormatos
        restVersionFormatosMockMvc.perform(get("/api/version-formatos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVersionFormatos() throws Exception {
        // Initialize the database
        versionFormatosRepository.saveAndFlush(versionFormatos);

        int databaseSizeBeforeUpdate = versionFormatosRepository.findAll().size();

        // Update the versionFormatos
        VersionFormatos updatedVersionFormatos = versionFormatosRepository.findById(versionFormatos.getId()).get();
        // Disconnect from session so that the updates on updatedVersionFormatos are not directly saved in db
        em.detach(updatedVersionFormatos);
        updatedVersionFormatos
            .code(UPDATED_CODE)
            .idFormato(UPDATED_ID_FORMATO)
            .rutaFormato(UPDATED_RUTA_FORMATO)
            .rutaFormatoContentType(UPDATED_RUTA_FORMATO_CONTENT_TYPE)
            .nomFormato(UPDATED_NOM_FORMATO);

        restVersionFormatosMockMvc.perform(put("/api/version-formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVersionFormatos)))
            .andExpect(status().isOk());

        // Validate the VersionFormatos in the database
        List<VersionFormatos> versionFormatosList = versionFormatosRepository.findAll();
        assertThat(versionFormatosList).hasSize(databaseSizeBeforeUpdate);
        VersionFormatos testVersionFormatos = versionFormatosList.get(versionFormatosList.size() - 1);
        assertThat(testVersionFormatos.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testVersionFormatos.getIdFormato()).isEqualTo(UPDATED_ID_FORMATO);
        assertThat(testVersionFormatos.getRutaFormato()).isEqualTo(UPDATED_RUTA_FORMATO);
        assertThat(testVersionFormatos.getRutaFormatoContentType()).isEqualTo(UPDATED_RUTA_FORMATO_CONTENT_TYPE);
        assertThat(testVersionFormatos.getNomFormato()).isEqualTo(UPDATED_NOM_FORMATO);
    }

    @Test
    @Transactional
    public void updateNonExistingVersionFormatos() throws Exception {
        int databaseSizeBeforeUpdate = versionFormatosRepository.findAll().size();

        // Create the VersionFormatos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVersionFormatosMockMvc.perform(put("/api/version-formatos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionFormatos)))
            .andExpect(status().isBadRequest());

        // Validate the VersionFormatos in the database
        List<VersionFormatos> versionFormatosList = versionFormatosRepository.findAll();
        assertThat(versionFormatosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVersionFormatos() throws Exception {
        // Initialize the database
        versionFormatosRepository.saveAndFlush(versionFormatos);

        int databaseSizeBeforeDelete = versionFormatosRepository.findAll().size();

        // Delete the versionFormatos
        restVersionFormatosMockMvc.perform(delete("/api/version-formatos/{id}", versionFormatos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<VersionFormatos> versionFormatosList = versionFormatosRepository.findAll();
        assertThat(versionFormatosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VersionFormatos.class);
        VersionFormatos versionFormatos1 = new VersionFormatos();
        versionFormatos1.setId(1L);
        VersionFormatos versionFormatos2 = new VersionFormatos();
        versionFormatos2.setId(versionFormatos1.getId());
        assertThat(versionFormatos1).isEqualTo(versionFormatos2);
        versionFormatos2.setId(2L);
        assertThat(versionFormatos1).isNotEqualTo(versionFormatos2);
        versionFormatos1.setId(null);
        assertThat(versionFormatos1).isNotEqualTo(versionFormatos2);
    }
}
