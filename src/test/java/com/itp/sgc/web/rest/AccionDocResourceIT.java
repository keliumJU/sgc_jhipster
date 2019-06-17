package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.AccionDoc;
import com.itp.sgc.repository.AccionDocRepository;
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
 * Integration tests for the {@Link AccionDocResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class AccionDocResourceIT {

    private static final String DEFAULT_ACCION = "AAAAAAAAAA";
    private static final String UPDATED_ACCION = "BBBBBBBBBB";

    @Autowired
    private AccionDocRepository accionDocRepository;

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

    private MockMvc restAccionDocMockMvc;

    private AccionDoc accionDoc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccionDocResource accionDocResource = new AccionDocResource(accionDocRepository);
        this.restAccionDocMockMvc = MockMvcBuilders.standaloneSetup(accionDocResource)
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
    public static AccionDoc createEntity(EntityManager em) {
        AccionDoc accionDoc = new AccionDoc()
            .accion(DEFAULT_ACCION);
        return accionDoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccionDoc createUpdatedEntity(EntityManager em) {
        AccionDoc accionDoc = new AccionDoc()
            .accion(UPDATED_ACCION);
        return accionDoc;
    }

    @BeforeEach
    public void initTest() {
        accionDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccionDoc() throws Exception {
        int databaseSizeBeforeCreate = accionDocRepository.findAll().size();

        // Create the AccionDoc
        restAccionDocMockMvc.perform(post("/api/accion-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accionDoc)))
            .andExpect(status().isCreated());

        // Validate the AccionDoc in the database
        List<AccionDoc> accionDocList = accionDocRepository.findAll();
        assertThat(accionDocList).hasSize(databaseSizeBeforeCreate + 1);
        AccionDoc testAccionDoc = accionDocList.get(accionDocList.size() - 1);
        assertThat(testAccionDoc.getAccion()).isEqualTo(DEFAULT_ACCION);
    }

    @Test
    @Transactional
    public void createAccionDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accionDocRepository.findAll().size();

        // Create the AccionDoc with an existing ID
        accionDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccionDocMockMvc.perform(post("/api/accion-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accionDoc)))
            .andExpect(status().isBadRequest());

        // Validate the AccionDoc in the database
        List<AccionDoc> accionDocList = accionDocRepository.findAll();
        assertThat(accionDocList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAccionDocs() throws Exception {
        // Initialize the database
        accionDocRepository.saveAndFlush(accionDoc);

        // Get all the accionDocList
        restAccionDocMockMvc.perform(get("/api/accion-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accionDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].accion").value(hasItem(DEFAULT_ACCION.toString())));
    }
    
    @Test
    @Transactional
    public void getAccionDoc() throws Exception {
        // Initialize the database
        accionDocRepository.saveAndFlush(accionDoc);

        // Get the accionDoc
        restAccionDocMockMvc.perform(get("/api/accion-docs/{id}", accionDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accionDoc.getId().intValue()))
            .andExpect(jsonPath("$.accion").value(DEFAULT_ACCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAccionDoc() throws Exception {
        // Get the accionDoc
        restAccionDocMockMvc.perform(get("/api/accion-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccionDoc() throws Exception {
        // Initialize the database
        accionDocRepository.saveAndFlush(accionDoc);

        int databaseSizeBeforeUpdate = accionDocRepository.findAll().size();

        // Update the accionDoc
        AccionDoc updatedAccionDoc = accionDocRepository.findById(accionDoc.getId()).get();
        // Disconnect from session so that the updates on updatedAccionDoc are not directly saved in db
        em.detach(updatedAccionDoc);
        updatedAccionDoc
            .accion(UPDATED_ACCION);

        restAccionDocMockMvc.perform(put("/api/accion-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccionDoc)))
            .andExpect(status().isOk());

        // Validate the AccionDoc in the database
        List<AccionDoc> accionDocList = accionDocRepository.findAll();
        assertThat(accionDocList).hasSize(databaseSizeBeforeUpdate);
        AccionDoc testAccionDoc = accionDocList.get(accionDocList.size() - 1);
        assertThat(testAccionDoc.getAccion()).isEqualTo(UPDATED_ACCION);
    }

    @Test
    @Transactional
    public void updateNonExistingAccionDoc() throws Exception {
        int databaseSizeBeforeUpdate = accionDocRepository.findAll().size();

        // Create the AccionDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccionDocMockMvc.perform(put("/api/accion-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accionDoc)))
            .andExpect(status().isBadRequest());

        // Validate the AccionDoc in the database
        List<AccionDoc> accionDocList = accionDocRepository.findAll();
        assertThat(accionDocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAccionDoc() throws Exception {
        // Initialize the database
        accionDocRepository.saveAndFlush(accionDoc);

        int databaseSizeBeforeDelete = accionDocRepository.findAll().size();

        // Delete the accionDoc
        restAccionDocMockMvc.perform(delete("/api/accion-docs/{id}", accionDoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<AccionDoc> accionDocList = accionDocRepository.findAll();
        assertThat(accionDocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccionDoc.class);
        AccionDoc accionDoc1 = new AccionDoc();
        accionDoc1.setId(1L);
        AccionDoc accionDoc2 = new AccionDoc();
        accionDoc2.setId(accionDoc1.getId());
        assertThat(accionDoc1).isEqualTo(accionDoc2);
        accionDoc2.setId(2L);
        assertThat(accionDoc1).isNotEqualTo(accionDoc2);
        accionDoc1.setId(null);
        assertThat(accionDoc1).isNotEqualTo(accionDoc2);
    }
}
