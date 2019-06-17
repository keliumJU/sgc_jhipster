package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.ElementosDocSGC;
import com.itp.sgc.repository.ElementosDocSGCRepository;
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
 * Integration tests for the {@Link ElementosDocSGCResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class ElementosDocSGCResourceIT {

    private static final Integer DEFAULT_ID_ELEMENTO = 1;
    private static final Integer UPDATED_ID_ELEMENTO = 2;

    private static final Integer DEFAULT_ID_DOC = 1;
    private static final Integer UPDATED_ID_DOC = 2;

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    @Autowired
    private ElementosDocSGCRepository elementosDocSGCRepository;

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

    private MockMvc restElementosDocSGCMockMvc;

    private ElementosDocSGC elementosDocSGC;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ElementosDocSGCResource elementosDocSGCResource = new ElementosDocSGCResource(elementosDocSGCRepository);
        this.restElementosDocSGCMockMvc = MockMvcBuilders.standaloneSetup(elementosDocSGCResource)
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
    public static ElementosDocSGC createEntity(EntityManager em) {
        ElementosDocSGC elementosDocSGC = new ElementosDocSGC()
            .idElemento(DEFAULT_ID_ELEMENTO)
            .idDoc(DEFAULT_ID_DOC)
            .valor(DEFAULT_VALOR);
        return elementosDocSGC;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ElementosDocSGC createUpdatedEntity(EntityManager em) {
        ElementosDocSGC elementosDocSGC = new ElementosDocSGC()
            .idElemento(UPDATED_ID_ELEMENTO)
            .idDoc(UPDATED_ID_DOC)
            .valor(UPDATED_VALOR);
        return elementosDocSGC;
    }

    @BeforeEach
    public void initTest() {
        elementosDocSGC = createEntity(em);
    }

    @Test
    @Transactional
    public void createElementosDocSGC() throws Exception {
        int databaseSizeBeforeCreate = elementosDocSGCRepository.findAll().size();

        // Create the ElementosDocSGC
        restElementosDocSGCMockMvc.perform(post("/api/elementos-doc-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(elementosDocSGC)))
            .andExpect(status().isCreated());

        // Validate the ElementosDocSGC in the database
        List<ElementosDocSGC> elementosDocSGCList = elementosDocSGCRepository.findAll();
        assertThat(elementosDocSGCList).hasSize(databaseSizeBeforeCreate + 1);
        ElementosDocSGC testElementosDocSGC = elementosDocSGCList.get(elementosDocSGCList.size() - 1);
        assertThat(testElementosDocSGC.getIdElemento()).isEqualTo(DEFAULT_ID_ELEMENTO);
        assertThat(testElementosDocSGC.getIdDoc()).isEqualTo(DEFAULT_ID_DOC);
        assertThat(testElementosDocSGC.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createElementosDocSGCWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = elementosDocSGCRepository.findAll().size();

        // Create the ElementosDocSGC with an existing ID
        elementosDocSGC.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restElementosDocSGCMockMvc.perform(post("/api/elementos-doc-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(elementosDocSGC)))
            .andExpect(status().isBadRequest());

        // Validate the ElementosDocSGC in the database
        List<ElementosDocSGC> elementosDocSGCList = elementosDocSGCRepository.findAll();
        assertThat(elementosDocSGCList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllElementosDocSGCS() throws Exception {
        // Initialize the database
        elementosDocSGCRepository.saveAndFlush(elementosDocSGC);

        // Get all the elementosDocSGCList
        restElementosDocSGCMockMvc.perform(get("/api/elementos-doc-sgcs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(elementosDocSGC.getId().intValue())))
            .andExpect(jsonPath("$.[*].idElemento").value(hasItem(DEFAULT_ID_ELEMENTO)))
            .andExpect(jsonPath("$.[*].idDoc").value(hasItem(DEFAULT_ID_DOC)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.toString())));
    }
    
    @Test
    @Transactional
    public void getElementosDocSGC() throws Exception {
        // Initialize the database
        elementosDocSGCRepository.saveAndFlush(elementosDocSGC);

        // Get the elementosDocSGC
        restElementosDocSGCMockMvc.perform(get("/api/elementos-doc-sgcs/{id}", elementosDocSGC.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(elementosDocSGC.getId().intValue()))
            .andExpect(jsonPath("$.idElemento").value(DEFAULT_ID_ELEMENTO))
            .andExpect(jsonPath("$.idDoc").value(DEFAULT_ID_DOC))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingElementosDocSGC() throws Exception {
        // Get the elementosDocSGC
        restElementosDocSGCMockMvc.perform(get("/api/elementos-doc-sgcs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateElementosDocSGC() throws Exception {
        // Initialize the database
        elementosDocSGCRepository.saveAndFlush(elementosDocSGC);

        int databaseSizeBeforeUpdate = elementosDocSGCRepository.findAll().size();

        // Update the elementosDocSGC
        ElementosDocSGC updatedElementosDocSGC = elementosDocSGCRepository.findById(elementosDocSGC.getId()).get();
        // Disconnect from session so that the updates on updatedElementosDocSGC are not directly saved in db
        em.detach(updatedElementosDocSGC);
        updatedElementosDocSGC
            .idElemento(UPDATED_ID_ELEMENTO)
            .idDoc(UPDATED_ID_DOC)
            .valor(UPDATED_VALOR);

        restElementosDocSGCMockMvc.perform(put("/api/elementos-doc-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedElementosDocSGC)))
            .andExpect(status().isOk());

        // Validate the ElementosDocSGC in the database
        List<ElementosDocSGC> elementosDocSGCList = elementosDocSGCRepository.findAll();
        assertThat(elementosDocSGCList).hasSize(databaseSizeBeforeUpdate);
        ElementosDocSGC testElementosDocSGC = elementosDocSGCList.get(elementosDocSGCList.size() - 1);
        assertThat(testElementosDocSGC.getIdElemento()).isEqualTo(UPDATED_ID_ELEMENTO);
        assertThat(testElementosDocSGC.getIdDoc()).isEqualTo(UPDATED_ID_DOC);
        assertThat(testElementosDocSGC.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingElementosDocSGC() throws Exception {
        int databaseSizeBeforeUpdate = elementosDocSGCRepository.findAll().size();

        // Create the ElementosDocSGC

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restElementosDocSGCMockMvc.perform(put("/api/elementos-doc-sgcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(elementosDocSGC)))
            .andExpect(status().isBadRequest());

        // Validate the ElementosDocSGC in the database
        List<ElementosDocSGC> elementosDocSGCList = elementosDocSGCRepository.findAll();
        assertThat(elementosDocSGCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteElementosDocSGC() throws Exception {
        // Initialize the database
        elementosDocSGCRepository.saveAndFlush(elementosDocSGC);

        int databaseSizeBeforeDelete = elementosDocSGCRepository.findAll().size();

        // Delete the elementosDocSGC
        restElementosDocSGCMockMvc.perform(delete("/api/elementos-doc-sgcs/{id}", elementosDocSGC.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ElementosDocSGC> elementosDocSGCList = elementosDocSGCRepository.findAll();
        assertThat(elementosDocSGCList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ElementosDocSGC.class);
        ElementosDocSGC elementosDocSGC1 = new ElementosDocSGC();
        elementosDocSGC1.setId(1L);
        ElementosDocSGC elementosDocSGC2 = new ElementosDocSGC();
        elementosDocSGC2.setId(elementosDocSGC1.getId());
        assertThat(elementosDocSGC1).isEqualTo(elementosDocSGC2);
        elementosDocSGC2.setId(2L);
        assertThat(elementosDocSGC1).isNotEqualTo(elementosDocSGC2);
        elementosDocSGC1.setId(null);
        assertThat(elementosDocSGC1).isNotEqualTo(elementosDocSGC2);
    }
}
