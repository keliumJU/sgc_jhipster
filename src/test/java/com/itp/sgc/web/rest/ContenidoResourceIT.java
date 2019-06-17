package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.Contenido;
import com.itp.sgc.repository.ContenidoRepository;
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
 * Integration tests for the {@Link ContenidoResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class ContenidoResourceIT {

    private static final String DEFAULT_ACTIVIDAD = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSABLE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSABLE = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTRO = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRO = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    @Autowired
    private ContenidoRepository contenidoRepository;

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

    private MockMvc restContenidoMockMvc;

    private Contenido contenido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContenidoResource contenidoResource = new ContenidoResource(contenidoRepository);
        this.restContenidoMockMvc = MockMvcBuilders.standaloneSetup(contenidoResource)
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
    public static Contenido createEntity(EntityManager em) {
        Contenido contenido = new Contenido()
            .actividad(DEFAULT_ACTIVIDAD)
            .descripcion(DEFAULT_DESCRIPCION)
            .responsable(DEFAULT_RESPONSABLE)
            .registro(DEFAULT_REGISTRO)
            .idDoc(DEFAULT_ID_DOC);
        return contenido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contenido createUpdatedEntity(EntityManager em) {
        Contenido contenido = new Contenido()
            .actividad(UPDATED_ACTIVIDAD)
            .descripcion(UPDATED_DESCRIPCION)
            .responsable(UPDATED_RESPONSABLE)
            .registro(UPDATED_REGISTRO)
            .idDoc(UPDATED_ID_DOC);
        return contenido;
    }

    @BeforeEach
    public void initTest() {
        contenido = createEntity(em);
    }

    @Test
    @Transactional
    public void createContenido() throws Exception {
        int databaseSizeBeforeCreate = contenidoRepository.findAll().size();

        // Create the Contenido
        restContenidoMockMvc.perform(post("/api/contenidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contenido)))
            .andExpect(status().isCreated());

        // Validate the Contenido in the database
        List<Contenido> contenidoList = contenidoRepository.findAll();
        assertThat(contenidoList).hasSize(databaseSizeBeforeCreate + 1);
        Contenido testContenido = contenidoList.get(contenidoList.size() - 1);
        assertThat(testContenido.getActividad()).isEqualTo(DEFAULT_ACTIVIDAD);
        assertThat(testContenido.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testContenido.getResponsable()).isEqualTo(DEFAULT_RESPONSABLE);
        assertThat(testContenido.getRegistro()).isEqualTo(DEFAULT_REGISTRO);
        assertThat(testContenido.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
    }

    @Test
    @Transactional
    public void createContenidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contenidoRepository.findAll().size();

        // Create the Contenido with an existing ID
        contenido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContenidoMockMvc.perform(post("/api/contenidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contenido)))
            .andExpect(status().isBadRequest());

        // Validate the Contenido in the database
        List<Contenido> contenidoList = contenidoRepository.findAll();
        assertThat(contenidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContenidos() throws Exception {
        // Initialize the database
        contenidoRepository.saveAndFlush(contenido);

        // Get all the contenidoList
        restContenidoMockMvc.perform(get("/api/contenidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contenido.getId().intValue())))
            .andExpect(jsonPath("$.[*].actividad").value(hasItem(DEFAULT_ACTIVIDAD.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE.toString())))
            .andExpect(jsonPath("$.[*].registro").value(hasItem(DEFAULT_REGISTRO.toString())))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)));
    }
    
    @Test
    @Transactional
    public void getContenido() throws Exception {
        // Initialize the database
        contenidoRepository.saveAndFlush(contenido);

        // Get the contenido
        restContenidoMockMvc.perform(get("/api/contenidos/{id}", contenido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contenido.getId().intValue()))
            .andExpect(jsonPath("$.actividad").value(DEFAULT_ACTIVIDAD.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.responsable").value(DEFAULT_RESPONSABLE.toString()))
            .andExpect(jsonPath("$.registro").value(DEFAULT_REGISTRO.toString()))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC));
    }

    @Test
    @Transactional
    public void getNonExistingContenido() throws Exception {
        // Get the contenido
        restContenidoMockMvc.perform(get("/api/contenidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContenido() throws Exception {
        // Initialize the database
        contenidoRepository.saveAndFlush(contenido);

        int databaseSizeBeforeUpdate = contenidoRepository.findAll().size();

        // Update the contenido
        Contenido updatedContenido = contenidoRepository.findById(contenido.getId()).get();
        // Disconnect from session so that the updates on updatedContenido are not directly saved in db
        em.detach(updatedContenido);
        updatedContenido
            .actividad(UPDATED_ACTIVIDAD)
            .descripcion(UPDATED_DESCRIPCION)
            .responsable(UPDATED_RESPONSABLE)
            .registro(UPDATED_REGISTRO)
            .idDoc(UPDATED_ID_DOC);

        restContenidoMockMvc.perform(put("/api/contenidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContenido)))
            .andExpect(status().isOk());

        // Validate the Contenido in the database
        List<Contenido> contenidoList = contenidoRepository.findAll();
        assertThat(contenidoList).hasSize(databaseSizeBeforeUpdate);
        Contenido testContenido = contenidoList.get(contenidoList.size() - 1);
        assertThat(testContenido.getActividad()).isEqualTo(UPDATED_ACTIVIDAD);
        assertThat(testContenido.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testContenido.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testContenido.getRegistro()).isEqualTo(UPDATED_REGISTRO);
        assertThat(testContenido.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
    }

    @Test
    @Transactional
    public void updateNonExistingContenido() throws Exception {
        int databaseSizeBeforeUpdate = contenidoRepository.findAll().size();

        // Create the Contenido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContenidoMockMvc.perform(put("/api/contenidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contenido)))
            .andExpect(status().isBadRequest());

        // Validate the Contenido in the database
        List<Contenido> contenidoList = contenidoRepository.findAll();
        assertThat(contenidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContenido() throws Exception {
        // Initialize the database
        contenidoRepository.saveAndFlush(contenido);

        int databaseSizeBeforeDelete = contenidoRepository.findAll().size();

        // Delete the contenido
        restContenidoMockMvc.perform(delete("/api/contenidos/{id}", contenido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Contenido> contenidoList = contenidoRepository.findAll();
        assertThat(contenidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contenido.class);
        Contenido contenido1 = new Contenido();
        contenido1.setId(1L);
        Contenido contenido2 = new Contenido();
        contenido2.setId(contenido1.getId());
        assertThat(contenido1).isEqualTo(contenido2);
        contenido2.setId(2L);
        assertThat(contenido1).isNotEqualTo(contenido2);
        contenido1.setId(null);
        assertThat(contenido1).isNotEqualTo(contenido2);
    }
}
