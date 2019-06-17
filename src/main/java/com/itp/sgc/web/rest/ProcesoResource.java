package com.itp.sgc.web.rest;

import com.itp.sgc.domain.Proceso;
import com.itp.sgc.repository.ProcesoRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.Proceso}.
 */
@RestController
@RequestMapping("/api")
public class ProcesoResource {

    private final Logger log = LoggerFactory.getLogger(ProcesoResource.class);

    private static final String ENTITY_NAME = "proceso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProcesoRepository procesoRepository;

    public ProcesoResource(ProcesoRepository procesoRepository) {
        this.procesoRepository = procesoRepository;
    }

    /**
     * {@code POST  /procesos} : Create a new proceso.
     *
     * @param proceso the proceso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proceso, or with status {@code 400 (Bad Request)} if the proceso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/procesos")
    public ResponseEntity<Proceso> createProceso(@RequestBody Proceso proceso) throws URISyntaxException {
        log.debug("REST request to save Proceso : {}", proceso);
        if (proceso.getId() != null) {
            throw new BadRequestAlertException("A new proceso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proceso result = procesoRepository.save(proceso);
        return ResponseEntity.created(new URI("/api/procesos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /procesos} : Updates an existing proceso.
     *
     * @param proceso the proceso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proceso,
     * or with status {@code 400 (Bad Request)} if the proceso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proceso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/procesos")
    public ResponseEntity<Proceso> updateProceso(@RequestBody Proceso proceso) throws URISyntaxException {
        log.debug("REST request to update Proceso : {}", proceso);
        if (proceso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Proceso result = procesoRepository.save(proceso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proceso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /procesos} : get all the procesos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of procesos in body.
     */
    @GetMapping("/procesos")
    public List<Proceso> getAllProcesos() {
        log.debug("REST request to get all Procesos");
        return procesoRepository.findAll();
    }

    /**
     * {@code GET  /procesos/:id} : get the "id" proceso.
     *
     * @param id the id of the proceso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proceso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/procesos/{id}")
    public ResponseEntity<Proceso> getProceso(@PathVariable Long id) {
        log.debug("REST request to get Proceso : {}", id);
        Optional<Proceso> proceso = procesoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(proceso);
    }

    /**
     * {@code DELETE  /procesos/:id} : delete the "id" proceso.
     *
     * @param id the id of the proceso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/procesos/{id}")
    public ResponseEntity<Void> deleteProceso(@PathVariable Long id) {
        log.debug("REST request to delete Proceso : {}", id);
        procesoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
