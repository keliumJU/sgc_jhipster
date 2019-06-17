package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.Solicitud;
import com.itp.sgc.repository.SolicitudRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.itp.sgc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link SolicitudResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class SolicitudResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final Integer DEFAULT_ID_PROCESO = 1;
    private static final Integer UPDATED_ID_PROCESO = 2;

    private static final Integer DEFAULT_ID_TIPO_DOC = 1;
    private static final Integer UPDATED_ID_TIPO_DOC = 2;

    private static final Integer DEFAULT_ID_TIPO_SOL = 1;
    private static final Integer UPDATED_ID_TIPO_SOL = 2;

    private static final LocalDate DEFAULT_FECHA_SOL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_SOL = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    @Autowired
    private SolicitudRepository solicitudRepository;

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

    private MockMvc restSolicitudMockMvc;

    private Solicitud solicitud;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolicitudResource solicitudResource = new SolicitudResource(solicitudRepository);
        this.restSolicitudMockMvc = MockMvcBuilders.standaloneSetup(solicitudResource)
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
    public static Solicitud createEntity(EntityManager em) {
        Solicitud solicitud = new Solicitud()
            .code(DEFAULT_CODE)
            .idProceso(DEFAULT_ID_PROCESO)
            .idTipoDoc(DEFAULT_ID_TIPO_DOC)
            .idTipoSol(DEFAULT_ID_TIPO_SOL)
            .fechaSol(DEFAULT_FECHA_SOL)
            .descripcion(DEFAULT_DESCRIPCION)
            .idDoc(DEFAULT_ID_DOC);
        return solicitud;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Solicitud createUpdatedEntity(EntityManager em) {
        Solicitud solicitud = new Solicitud()
            .code(UPDATED_CODE)
            .idProceso(UPDATED_ID_PROCESO)
            .idTipoDoc(UPDATED_ID_TIPO_DOC)
            .idTipoSol(UPDATED_ID_TIPO_SOL)
            .fechaSol(UPDATED_FECHA_SOL)
            .descripcion(UPDATED_DESCRIPCION)
            .idDoc(UPDATED_ID_DOC);
        return solicitud;
    }

    @BeforeEach
    public void initTest() {
        solicitud = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolicitud() throws Exception {
        int databaseSizeBeforeCreate = solicitudRepository.findAll().size();

        // Create the Solicitud
        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isCreated());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeCreate + 1);
        Solicitud testSolicitud = solicitudList.get(solicitudList.size() - 1);
        assertThat(testSolicitud.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testSolicitud.getIdProceso()).isEqualTo(DEFAULT_ID_PROCESO);
        assertThat(testSolicitud.getIdTipoDoc()).isEqualTo(DEFAULT_ID_TIPO_DOC);
        assertThat(testSolicitud.getIdTipoSol()).isEqualTo(DEFAULT_ID_TIPO_SOL);
        assertThat(testSolicitud.getFechaSol()).isEqualTo(DEFAULT_FECHA_SOL);
        assertThat(testSolicitud.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testSolicitud.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
    }

    @Test
    @Transactional
    public void createSolicitudWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solicitudRepository.findAll().size();

        // Create the Solicitud with an existing ID
        solicitud.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicitudMockMvc.perform(post("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSolicituds() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);

        // Get all the solicitudList
        restSolicitudMockMvc.perform(get("/api/solicituds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitud.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].idProceso").value(hasItem(DEFAULT_ID_PROCESO)))
            .andExpect(jsonPath("$.[*].idTipoDoc").value(hasItem(DEFAULT_ID_TIPO_DOC)))
            .andExpect(jsonPath("$.[*].idTipoSol").value(hasItem(DEFAULT_ID_TIPO_SOL)))
            .andExpect(jsonPath("$.[*].fechaSol").value(hasItem(DEFAULT_FECHA_SOL.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)));
    }
    
    @Test
    @Transactional
    public void getSolicitud() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);

        // Get the solicitud
        restSolicitudMockMvc.perform(get("/api/solicituds/{id}", solicitud.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solicitud.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.idProceso").value(DEFAULT_ID_PROCESO))
            .andExpect(jsonPath("$.idTipoDoc").value(DEFAULT_ID_TIPO_DOC))
            .andExpect(jsonPath("$.idTipoSol").value(DEFAULT_ID_TIPO_SOL))
            .andExpect(jsonPath("$.fechaSol").value(DEFAULT_FECHA_SOL.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC));
    }

    @Test
    @Transactional
    public void getNonExistingSolicitud() throws Exception {
        // Get the solicitud
        restSolicitudMockMvc.perform(get("/api/solicituds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolicitud() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);

        int databaseSizeBeforeUpdate = solicitudRepository.findAll().size();

        // Update the solicitud
        Solicitud updatedSolicitud = solicitudRepository.findById(solicitud.getId()).get();
        // Disconnect from session so that the updates on updatedSolicitud are not directly saved in db
        em.detach(updatedSolicitud);
        updatedSolicitud
            .code(UPDATED_CODE)
            .idProceso(UPDATED_ID_PROCESO)
            .idTipoDoc(UPDATED_ID_TIPO_DOC)
            .idTipoSol(UPDATED_ID_TIPO_SOL)
            .fechaSol(UPDATED_FECHA_SOL)
            .descripcion(UPDATED_DESCRIPCION)
            .idDoc(UPDATED_ID_DOC);

        restSolicitudMockMvc.perform(put("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolicitud)))
            .andExpect(status().isOk());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeUpdate);
        Solicitud testSolicitud = solicitudList.get(solicitudList.size() - 1);
        assertThat(testSolicitud.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testSolicitud.getIdProceso()).isEqualTo(UPDATED_ID_PROCESO);
        assertThat(testSolicitud.getIdTipoDoc()).isEqualTo(UPDATED_ID_TIPO_DOC);
        assertThat(testSolicitud.getIdTipoSol()).isEqualTo(UPDATED_ID_TIPO_SOL);
        assertThat(testSolicitud.getFechaSol()).isEqualTo(UPDATED_FECHA_SOL);
        assertThat(testSolicitud.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testSolicitud.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
    }

    @Test
    @Transactional
    public void updateNonExistingSolicitud() throws Exception {
        int databaseSizeBeforeUpdate = solicitudRepository.findAll().size();

        // Create the Solicitud

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolicitudMockMvc.perform(put("/api/solicituds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitud)))
            .andExpect(status().isBadRequest());

        // Validate the Solicitud in the database
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSolicitud() throws Exception {
        // Initialize the database
        solicitudRepository.saveAndFlush(solicitud);

        int databaseSizeBeforeDelete = solicitudRepository.findAll().size();

        // Delete the solicitud
        restSolicitudMockMvc.perform(delete("/api/solicituds/{id}", solicitud.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        assertThat(solicitudList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Solicitud.class);
        Solicitud solicitud1 = new Solicitud();
        solicitud1.setId(1L);
        Solicitud solicitud2 = new Solicitud();
        solicitud2.setId(solicitud1.getId());
        assertThat(solicitud1).isEqualTo(solicitud2);
        solicitud2.setId(2L);
        assertThat(solicitud1).isNotEqualTo(solicitud2);
        solicitud1.setId(null);
        assertThat(solicitud1).isNotEqualTo(solicitud2);
    }
}
