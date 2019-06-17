package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.HistorialCambios;
import com.itp.sgc.repository.HistorialCambiosRepository;
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
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.itp.sgc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link HistorialCambiosResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class HistorialCambiosResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_ACTIVIDAD = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_CAMBIO = "AAAAAAAAAA";
    private static final String UPDATED_CAMBIO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final LocalDate DEFAULT_V_VIGENTE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_V_VIGENTE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_V_OBSOLETA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_V_OBSOLETA = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    private static final byte[] DEFAULT_RUTA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RUTA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_RUTA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RUTA_CONTENT_TYPE = "image/png";

    @Autowired
    private HistorialCambiosRepository historialCambiosRepository;

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

    private MockMvc restHistorialCambiosMockMvc;

    private HistorialCambios historialCambios;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HistorialCambiosResource historialCambiosResource = new HistorialCambiosResource(historialCambiosRepository);
        this.restHistorialCambiosMockMvc = MockMvcBuilders.standaloneSetup(historialCambiosResource)
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
    public static HistorialCambios createEntity(EntityManager em) {
        HistorialCambios historialCambios = new HistorialCambios()
            .code(DEFAULT_CODE)
            .actividad(DEFAULT_ACTIVIDAD)
            .cambio(DEFAULT_CAMBIO)
            .fecha(DEFAULT_FECHA)
            .vVigente(DEFAULT_V_VIGENTE)
            .vObsoleta(DEFAULT_V_OBSOLETA)
            .idDoc(DEFAULT_ID_DOC)
            .ruta(DEFAULT_RUTA)
            .rutaContentType(DEFAULT_RUTA_CONTENT_TYPE);
        return historialCambios;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistorialCambios createUpdatedEntity(EntityManager em) {
        HistorialCambios historialCambios = new HistorialCambios()
            .code(UPDATED_CODE)
            .actividad(UPDATED_ACTIVIDAD)
            .cambio(UPDATED_CAMBIO)
            .fecha(UPDATED_FECHA)
            .vVigente(UPDATED_V_VIGENTE)
            .vObsoleta(UPDATED_V_OBSOLETA)
            .idDoc(UPDATED_ID_DOC)
            .ruta(UPDATED_RUTA)
            .rutaContentType(UPDATED_RUTA_CONTENT_TYPE);
        return historialCambios;
    }

    @BeforeEach
    public void initTest() {
        historialCambios = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistorialCambios() throws Exception {
        int databaseSizeBeforeCreate = historialCambiosRepository.findAll().size();

        // Create the HistorialCambios
        restHistorialCambiosMockMvc.perform(post("/api/historial-cambios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historialCambios)))
            .andExpect(status().isCreated());

        // Validate the HistorialCambios in the database
        List<HistorialCambios> historialCambiosList = historialCambiosRepository.findAll();
        assertThat(historialCambiosList).hasSize(databaseSizeBeforeCreate + 1);
        HistorialCambios testHistorialCambios = historialCambiosList.get(historialCambiosList.size() - 1);
        assertThat(testHistorialCambios.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testHistorialCambios.getActividad()).isEqualTo(DEFAULT_ACTIVIDAD);
        assertThat(testHistorialCambios.getCambio()).isEqualTo(DEFAULT_CAMBIO);
        assertThat(testHistorialCambios.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testHistorialCambios.getvVigente()).isEqualTo(DEFAULT_V_VIGENTE);
        assertThat(testHistorialCambios.getvObsoleta()).isEqualTo(DEFAULT_V_OBSOLETA);
        assertThat(testHistorialCambios.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
        assertThat(testHistorialCambios.getRuta()).isEqualTo(DEFAULT_RUTA);
        assertThat(testHistorialCambios.getRutaContentType()).isEqualTo(DEFAULT_RUTA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createHistorialCambiosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historialCambiosRepository.findAll().size();

        // Create the HistorialCambios with an existing ID
        historialCambios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistorialCambiosMockMvc.perform(post("/api/historial-cambios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historialCambios)))
            .andExpect(status().isBadRequest());

        // Validate the HistorialCambios in the database
        List<HistorialCambios> historialCambiosList = historialCambiosRepository.findAll();
        assertThat(historialCambiosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHistorialCambios() throws Exception {
        // Initialize the database
        historialCambiosRepository.saveAndFlush(historialCambios);

        // Get all the historialCambiosList
        restHistorialCambiosMockMvc.perform(get("/api/historial-cambios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historialCambios.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].actividad").value(hasItem(DEFAULT_ACTIVIDAD.toString())))
            .andExpect(jsonPath("$.[*].cambio").value(hasItem(DEFAULT_CAMBIO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].vVigente").value(hasItem(DEFAULT_V_VIGENTE.toString())))
            .andExpect(jsonPath("$.[*].vObsoleta").value(hasItem(DEFAULT_V_OBSOLETA.toString())))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)))
            .andExpect(jsonPath("$.[*].rutaContentType").value(hasItem(DEFAULT_RUTA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].ruta").value(hasItem(Base64Utils.encodeToString(DEFAULT_RUTA))));
    }
    
    @Test
    @Transactional
    public void getHistorialCambios() throws Exception {
        // Initialize the database
        historialCambiosRepository.saveAndFlush(historialCambios);

        // Get the historialCambios
        restHistorialCambiosMockMvc.perform(get("/api/historial-cambios/{id}", historialCambios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(historialCambios.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.actividad").value(DEFAULT_ACTIVIDAD.toString()))
            .andExpect(jsonPath("$.cambio").value(DEFAULT_CAMBIO.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.vVigente").value(DEFAULT_V_VIGENTE.toString()))
            .andExpect(jsonPath("$.vObsoleta").value(DEFAULT_V_OBSOLETA.toString()))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC))
            .andExpect(jsonPath("$.rutaContentType").value(DEFAULT_RUTA_CONTENT_TYPE))
            .andExpect(jsonPath("$.ruta").value(Base64Utils.encodeToString(DEFAULT_RUTA)));
    }

    @Test
    @Transactional
    public void getNonExistingHistorialCambios() throws Exception {
        // Get the historialCambios
        restHistorialCambiosMockMvc.perform(get("/api/historial-cambios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistorialCambios() throws Exception {
        // Initialize the database
        historialCambiosRepository.saveAndFlush(historialCambios);

        int databaseSizeBeforeUpdate = historialCambiosRepository.findAll().size();

        // Update the historialCambios
        HistorialCambios updatedHistorialCambios = historialCambiosRepository.findById(historialCambios.getId()).get();
        // Disconnect from session so that the updates on updatedHistorialCambios are not directly saved in db
        em.detach(updatedHistorialCambios);
        updatedHistorialCambios
            .code(UPDATED_CODE)
            .actividad(UPDATED_ACTIVIDAD)
            .cambio(UPDATED_CAMBIO)
            .fecha(UPDATED_FECHA)
            .vVigente(UPDATED_V_VIGENTE)
            .vObsoleta(UPDATED_V_OBSOLETA)
            .idDoc(UPDATED_ID_DOC)
            .ruta(UPDATED_RUTA)
            .rutaContentType(UPDATED_RUTA_CONTENT_TYPE);

        restHistorialCambiosMockMvc.perform(put("/api/historial-cambios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistorialCambios)))
            .andExpect(status().isOk());

        // Validate the HistorialCambios in the database
        List<HistorialCambios> historialCambiosList = historialCambiosRepository.findAll();
        assertThat(historialCambiosList).hasSize(databaseSizeBeforeUpdate);
        HistorialCambios testHistorialCambios = historialCambiosList.get(historialCambiosList.size() - 1);
        assertThat(testHistorialCambios.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testHistorialCambios.getActividad()).isEqualTo(UPDATED_ACTIVIDAD);
        assertThat(testHistorialCambios.getCambio()).isEqualTo(UPDATED_CAMBIO);
        assertThat(testHistorialCambios.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testHistorialCambios.getvVigente()).isEqualTo(UPDATED_V_VIGENTE);
        assertThat(testHistorialCambios.getvObsoleta()).isEqualTo(UPDATED_V_OBSOLETA);
        assertThat(testHistorialCambios.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
        assertThat(testHistorialCambios.getRuta()).isEqualTo(UPDATED_RUTA);
        assertThat(testHistorialCambios.getRutaContentType()).isEqualTo(UPDATED_RUTA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingHistorialCambios() throws Exception {
        int databaseSizeBeforeUpdate = historialCambiosRepository.findAll().size();

        // Create the HistorialCambios

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistorialCambiosMockMvc.perform(put("/api/historial-cambios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historialCambios)))
            .andExpect(status().isBadRequest());

        // Validate the HistorialCambios in the database
        List<HistorialCambios> historialCambiosList = historialCambiosRepository.findAll();
        assertThat(historialCambiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistorialCambios() throws Exception {
        // Initialize the database
        historialCambiosRepository.saveAndFlush(historialCambios);

        int databaseSizeBeforeDelete = historialCambiosRepository.findAll().size();

        // Delete the historialCambios
        restHistorialCambiosMockMvc.perform(delete("/api/historial-cambios/{id}", historialCambios.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<HistorialCambios> historialCambiosList = historialCambiosRepository.findAll();
        assertThat(historialCambiosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistorialCambios.class);
        HistorialCambios historialCambios1 = new HistorialCambios();
        historialCambios1.setId(1L);
        HistorialCambios historialCambios2 = new HistorialCambios();
        historialCambios2.setId(historialCambios1.getId());
        assertThat(historialCambios1).isEqualTo(historialCambios2);
        historialCambios2.setId(2L);
        assertThat(historialCambios1).isNotEqualTo(historialCambios2);
        historialCambios1.setId(null);
        assertThat(historialCambios1).isNotEqualTo(historialCambios2);
    }
}
