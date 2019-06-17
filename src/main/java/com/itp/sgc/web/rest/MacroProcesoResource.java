package com.itp.sgc.web.rest;

import com.itp.sgc.domain.MacroProceso;
import com.itp.sgc.repository.MacroProcesoRepository;
import com.itp.sgc.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.itp.sgc.domain.MacroProceso}.
 */
@RestController
@RequestMapping("/api")
public class MacroProcesoResource {

    private final Logger log = LoggerFactory.getLogger(MacroProcesoResource.class);

    private static final String ENTITY_NAME = "macroProceso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MacroProcesoRepository macroProcesoRepository;

    public MacroProcesoResource(MacroProcesoRepository macroProcesoRepository) {
        this.macroProcesoRepository = macroProcesoRepository;
    }

    /**
     * {@code POST  /macro-procesos} : Create a new macroProceso.
     *
     * @param macroProceso the macroProceso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new macroProceso, or with status {@code 400 (Bad Request)} if the macroProceso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/macro-procesos")
    public ResponseEntity<MacroProceso> createMacroProceso(@RequestBody MacroProceso macroProceso) throws URISyntaxException {
        log.debug("REST request to save MacroProceso : {}", macroProceso);
        if (macroProceso.getId() != null) {
            throw new BadRequestAlertException("A new macroProceso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MacroProceso result = macroProcesoRepository.save(macroProceso);
        return ResponseEntity.created(new URI("/api/macro-procesos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /macro-procesos} : Updates an existing macroProceso.
     *
     * @param macroProceso the macroProceso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated macroProceso,
     * or with status {@code 400 (Bad Request)} if the macroProceso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the macroProceso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/macro-procesos")
    public ResponseEntity<MacroProceso> updateMacroProceso(@RequestBody MacroProceso macroProceso) throws URISyntaxException {
        log.debug("REST request to update MacroProceso : {}", macroProceso);
        if (macroProceso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MacroProceso result = macroProcesoRepository.save(macroProceso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, macroProceso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /macro-procesos} : get all the macroProcesos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of macroProcesos in body.
     */
    @GetMapping("/macro-procesos")
    public List<MacroProceso> getAllMacroProcesos() {
        log.debug("REST request to get all MacroProcesos");
        return macroProcesoRepository.findAll();
    }

    /**
     * {@code GET  /macro-procesos/:id} : get the "id" macroProceso.
     *
     * @param id the id of the macroProceso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the macroProceso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/macro-procesos/{id}")
    public ResponseEntity<MacroProceso> getMacroProceso(@PathVariable Long id) {
        log.debug("REST request to get MacroProceso : {}", id);
        Optional<MacroProceso> macroProceso = macroProcesoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(macroProceso);
    }

    /**
     * {@code DELETE  /macro-procesos/:id} : delete the "id" macroProceso.
     *
     * @param id the id of the macroProceso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/macro-procesos/{id}")
    public ResponseEntity<Void> deleteMacroProceso(@PathVariable Long id) {
        log.debug("REST request to delete MacroProceso : {}", id);
        macroProcesoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
