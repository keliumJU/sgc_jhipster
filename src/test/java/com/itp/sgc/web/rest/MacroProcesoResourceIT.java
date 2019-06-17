package com.itp.sgc.web.rest;

import com.itp.sgc.SgcApp;
import com.itp.sgc.domain.MacroProceso;
import com.itp.sgc.repository.MacroProcesoRepository;
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
 * Integration tests for the {@Link MacroProcesoResource} REST controller.
 */
@SpringBootTest(classes = SgcApp.class)
public class MacroProcesoResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_MACRO_PROCESO = "AAAAAAAAAA";
    private static final String UPDATED_MACRO_PROCESO = "BBBBBBBBBB";

    @Autowired
    private MacroProcesoRepository macroProcesoRepository;

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

    private MockMvc restMacroProcesoMockMvc;

    private MacroProceso macroProceso;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MacroProcesoResource macroProcesoResource = new MacroProcesoResource(macroProcesoRepository);
        this.restMacroProcesoMockMvc = MockMvcBuilders.standaloneSetup(macroProcesoResource)
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
    public static MacroProceso createEntity(EntityManager em) {
        MacroProceso macroProceso = new MacroProceso()
            .code(DEFAULT_CODE)
            .macroProceso(DEFAULT_MACRO_PROCESO);
        return macroProceso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MacroProceso createUpdatedEntity(EntityManager em) {
        MacroProceso macroProceso = new MacroProceso()
            .code(UPDATED_CODE)
            .macroProceso(UPDATED_MACRO_PROCESO);
        return macroProceso;
    }

    @BeforeEach
    public void initTest() {
        macroProceso = createEntity(em);
    }

    @Test
    @Transactional
    public void createMacroProceso() throws Exception {
        int databaseSizeBeforeCreate = macroProcesoRepository.findAll().size();

        // Create the MacroProceso
        restMacroProcesoMockMvc.perform(post("/api/macro-procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(macroProceso)))
            .andExpect(status().isCreated());

        // Validate the MacroProceso in the database
        List<MacroProceso> macroProcesoList = macroProcesoRepository.findAll();
        assertThat(macroProcesoList).hasSize(databaseSizeBeforeCreate + 1);
        MacroProceso testMacroProceso = macroProcesoList.get(macroProcesoList.size() - 1);
        assertThat(testMacroProceso.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMacroProceso.getMacroProceso()).isEqualTo(DEFAULT_MACRO_PROCESO);
    }

    @Test
    @Transactional
    public void createMacroProcesoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = macroProcesoRepository.findAll().size();

        // Create the MacroProceso with an existing ID
        macroProceso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMacroProcesoMockMvc.perform(post("/api/macro-procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(macroProceso)))
            .andExpect(status().isBadRequest());

        // Validate the MacroProceso in the database
        List<MacroProceso> macroProcesoList = macroProcesoRepository.findAll();
        assertThat(macroProcesoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMacroProcesos() throws Exception {
        // Initialize the database
        macroProcesoRepository.saveAndFlush(macroProceso);

        // Get all the macroProcesoList
        restMacroProcesoMockMvc.perform(get("/api/macro-procesos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(macroProceso.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].macroProceso").value(hasItem(DEFAULT_MACRO_PROCESO.toString())));
    }
    
    @Test
    @Transactional
    public void getMacroProceso() throws Exception {
        // Initialize the database
        macroProcesoRepository.saveAndFlush(macroProceso);

        // Get the macroProceso
        restMacroProcesoMockMvc.perform(get("/api/macro-procesos/{id}", macroProceso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(macroProceso.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.macroProceso").value(DEFAULT_MACRO_PROCESO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMacroProceso() throws Exception {
        // Get the macroProceso
        restMacroProcesoMockMvc.perform(get("/api/macro-procesos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMacroProceso() throws Exception {
        // Initialize the database
        macroProcesoRepository.saveAndFlush(macroProceso);

        int databaseSizeBeforeUpdate = macroProcesoRepository.findAll().size();

        // Update the macroProceso
        MacroProceso updatedMacroProceso = macroProcesoRepository.findById(macroProceso.getId()).get();
        // Disconnect from session so that the updates on updatedMacroProceso are not directly saved in db
        em.detach(updatedMacroProceso);
        updatedMacroProceso
            .code(UPDATED_CODE)
            .macroProceso(UPDATED_MACRO_PROCESO);

        restMacroProcesoMockMvc.perform(put("/api/macro-procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMacroProceso)))
            .andExpect(status().isOk());

        // Validate the MacroProceso in the database
        List<MacroProceso> macroProcesoList = macroProcesoRepository.findAll();
        assertThat(macroProcesoList).hasSize(databaseSizeBeforeUpdate);
        MacroProceso testMacroProceso = macroProcesoList.get(macroProcesoList.size() - 1);
        assertThat(testMacroProceso.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMacroProceso.getMacroProceso()).isEqualTo(UPDATED_MACRO_PROCESO);
    }

    @Test
    @Transactional
    public void updateNonExistingMacroProceso() throws Exception {
        int databaseSizeBeforeUpdate = macroProcesoRepository.findAll().size();

        // Create the MacroProceso

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMacroProcesoMockMvc.perform(put("/api/macro-procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(macroProceso)))
            .andExpect(status().isBadRequest());

        // Validate the MacroProceso in the database
        List<MacroProceso> macroProcesoList = macroProcesoRepository.findAll();
        assertThat(macroProcesoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMacroProceso() throws Exception {
        // Initialize the database
        macroProcesoRepository.saveAndFlush(macroProceso);

        int databaseSizeBeforeDelete = macroProcesoRepository.findAll().size();

        // Delete the macroProceso
        restMacroProcesoMockMvc.perform(delete("/api/macro-procesos/{id}", macroProceso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<MacroProceso> macroProcesoList = macroProcesoRepository.findAll();
        assertThat(macroProcesoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MacroProceso.class);
        MacroProceso macroProceso1 = new MacroProceso();
        macroProceso1.setId(1L);
        MacroProceso macroProceso2 = new MacroProceso();
        macroProceso2.setId(macroProceso1.getId());
        assertThat(macroProceso1).isEqualTo(macroProceso2);
        macroProceso2.setId(2L);
        assertThat(macroProceso1).isNotEqualTo(macroProceso2);
        macroProceso1.setId(null);
        assertThat(macroProceso1).isNotEqualTo(macroProceso2);
    }
}
