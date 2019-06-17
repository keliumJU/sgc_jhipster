package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.Anexos;
import com.itp.sgc.repository.AnexosRepository;
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
 * Integration tests for the {@Link AnexosResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class AnexosResourceIT {

    private static final String DEFAULT_NOM_ANEXO = "AAAAAAAAAA";
    private static final String UPDATED_NOM_ANEXO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMG_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_ID_PADRE = 1;
    private static final Integer UPDATED_ID_PADRE = 2;

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    @Autowired
    private AnexosRepository anexosRepository;

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

    private MockMvc restAnexosMockMvc;

    private Anexos anexos;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnexosResource anexosResource = new AnexosResource(anexosRepository);
        this.restAnexosMockMvc = MockMvcBuilders.standaloneSetup(anexosResource)
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
    public static Anexos createEntity(EntityManager em) {
        Anexos anexos = new Anexos()
            .nomAnexo(DEFAULT_NOM_ANEXO)
            .descripcion(DEFAULT_DESCRIPCION)
            .img(DEFAULT_IMG)
            .imgContentType(DEFAULT_IMG_CONTENT_TYPE)
            .idPadre(DEFAULT_ID_PADRE)
            .idDoc(DEFAULT_ID_DOC);
        return anexos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Anexos createUpdatedEntity(EntityManager em) {
        Anexos anexos = new Anexos()
            .nomAnexo(UPDATED_NOM_ANEXO)
            .descripcion(UPDATED_DESCRIPCION)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .idPadre(UPDATED_ID_PADRE)
            .idDoc(UPDATED_ID_DOC);
        return anexos;
    }

    @BeforeEach
    public void initTest() {
        anexos = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnexos() throws Exception {
        int databaseSizeBeforeCreate = anexosRepository.findAll().size();

        // Create the Anexos
        restAnexosMockMvc.perform(post("/api/anexos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexos)))
            .andExpect(status().isCreated());

        // Validate the Anexos in the database
        List<Anexos> anexosList = anexosRepository.findAll();
        assertThat(anexosList).hasSize(databaseSizeBeforeCreate + 1);
        Anexos testAnexos = anexosList.get(anexosList.size() - 1);
        assertThat(testAnexos.getNomAnexo()).isEqualTo(DEFAULT_NOM_ANEXO);
        assertThat(testAnexos.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testAnexos.getImg()).isEqualTo(DEFAULT_IMG);
        assertThat(testAnexos.getImgContentType()).isEqualTo(DEFAULT_IMG_CONTENT_TYPE);
        assertThat(testAnexos.getIdPadre()).isEqualTo(DEFAULT_ID_PADRE);
        assertThat(testAnexos.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
    }

    @Test
    @Transactional
    public void createAnexosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anexosRepository.findAll().size();

        // Create the Anexos with an existing ID
        anexos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnexosMockMvc.perform(post("/api/anexos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexos)))
            .andExpect(status().isBadRequest());

        // Validate the Anexos in the database
        List<Anexos> anexosList = anexosRepository.findAll();
        assertThat(anexosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAnexos() throws Exception {
        // Initialize the database
        anexosRepository.saveAndFlush(anexos);

        // Get all the anexosList
        restAnexosMockMvc.perform(get("/api/anexos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anexos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomAnexo").value(hasItem(DEFAULT_NOM_ANEXO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].imgContentType").value(hasItem(DEFAULT_IMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].img").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMG))))
            .andExpect(jsonPath("$.[*].idPadre").value(hasItem(DEFAULT_ID_PADRE)))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)));
    }
    
    @Test
    @Transactional
    public void getAnexos() throws Exception {
        // Initialize the database
        anexosRepository.saveAndFlush(anexos);

        // Get the anexos
        restAnexosMockMvc.perform(get("/api/anexos/{id}", anexos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(anexos.getId().intValue()))
            .andExpect(jsonPath("$.nomAnexo").value(DEFAULT_NOM_ANEXO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.imgContentType").value(DEFAULT_IMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.img").value(Base64Utils.encodeToString(DEFAULT_IMG)))
            .andExpect(jsonPath("$.idPadre").value(DEFAULT_ID_PADRE))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC));
    }

    @Test
    @Transactional
    public void getNonExistingAnexos() throws Exception {
        // Get the anexos
        restAnexosMockMvc.perform(get("/api/anexos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnexos() throws Exception {
        // Initialize the database
        anexosRepository.saveAndFlush(anexos);

        int databaseSizeBeforeUpdate = anexosRepository.findAll().size();

        // Update the anexos
        Anexos updatedAnexos = anexosRepository.findById(anexos.getId()).get();
        // Disconnect from session so that the updates on updatedAnexos are not directly saved in db
        em.detach(updatedAnexos);
        updatedAnexos
            .nomAnexo(UPDATED_NOM_ANEXO)
            .descripcion(UPDATED_DESCRIPCION)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .idPadre(UPDATED_ID_PADRE)
            .idDoc(UPDATED_ID_DOC);

        restAnexosMockMvc.perform(put("/api/anexos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnexos)))
            .andExpect(status().isOk());

        // Validate the Anexos in the database
        List<Anexos> anexosList = anexosRepository.findAll();
        assertThat(anexosList).hasSize(databaseSizeBeforeUpdate);
        Anexos testAnexos = anexosList.get(anexosList.size() - 1);
        assertThat(testAnexos.getNomAnexo()).isEqualTo(UPDATED_NOM_ANEXO);
        assertThat(testAnexos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testAnexos.getImg()).isEqualTo(UPDATED_IMG);
        assertThat(testAnexos.getImgContentType()).isEqualTo(UPDATED_IMG_CONTENT_TYPE);
        assertThat(testAnexos.getIdPadre()).isEqualTo(UPDATED_ID_PADRE);
        assertThat(testAnexos.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
    }

    @Test
    @Transactional
    public void updateNonExistingAnexos() throws Exception {
        int databaseSizeBeforeUpdate = anexosRepository.findAll().size();

        // Create the Anexos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnexosMockMvc.perform(put("/api/anexos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anexos)))
            .andExpect(status().isBadRequest());

        // Validate the Anexos in the database
        List<Anexos> anexosList = anexosRepository.findAll();
        assertThat(anexosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnexos() throws Exception {
        // Initialize the database
        anexosRepository.saveAndFlush(anexos);

        int databaseSizeBeforeDelete = anexosRepository.findAll().size();

        // Delete the anexos
        restAnexosMockMvc.perform(delete("/api/anexos/{id}", anexos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Anexos> anexosList = anexosRepository.findAll();
        assertThat(anexosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Anexos.class);
        Anexos anexos1 = new Anexos();
        anexos1.setId(1L);
        Anexos anexos2 = new Anexos();
        anexos2.setId(anexos1.getId());
        assertThat(anexos1).isEqualTo(anexos2);
        anexos2.setId(2L);
        assertThat(anexos1).isNotEqualTo(anexos2);
        anexos1.setId(null);
        assertThat(anexos1).isNotEqualTo(anexos2);
    }
}
