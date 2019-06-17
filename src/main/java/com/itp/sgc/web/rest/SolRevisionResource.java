package com.itp.sgc.web.rest;

import com.itp.sgc.domain.SolRevision;
import com.itp.sgc.repository.SolRevisionRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.SolRevision}.
 */
@RestController
@RequestMapping("/api")
public class SolRevisionResource {

    private final Logger log = LoggerFactory.getLogger(SolRevisionResource.class);

    private static final String ENTITY_NAME = "solRevision";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SolRevisionRepository solRevisionRepository;

    public SolRevisionResource(SolRevisionRepository solRevisionRepository) {
        this.solRevisionRepository = solRevisionRepository;
    }

    /**
     * {@code POST  /sol-revisions} : Create a new solRevision.
     *
     * @param solRevision the solRevision to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new solRevision, or with status {@code 400 (Bad Request)} if the solRevision has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sol-revisions")
    public ResponseEntity<SolRevision> createSolRevision(@RequestBody SolRevision solRevision) throws URISyntaxException {
        log.debug("REST request to save SolRevision : {}", solRevision);
        if (solRevision.getId() != null) {
            throw new BadRequestAlertException("A new solRevision cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SolRevision result = solRevisionRepository.save(solRevision);
        return ResponseEntity.created(new URI("/api/sol-revisions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sol-revisions} : Updates an existing solRevision.
     *
     * @param solRevision the solRevision to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solRevision,
     * or with status {@code 400 (Bad Request)} if the solRevision is not valid,
     * or with status {@code 500 (Internal Server Error)} if the solRevision couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sol-revisions")
    public ResponseEntity<SolRevision> updateSolRevision(@RequestBody SolRevision solRevision) throws URISyntaxException {
        log.debug("REST request to update SolRevision : {}", solRevision);
        if (solRevision.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SolRevision result = solRevisionRepository.save(solRevision);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solRevision.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sol-revisions} : get all the solRevisions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of solRevisions in body.
     */
    @GetMapping("/sol-revisions")
    public List<SolRevision> getAllSolRevisions() {
        log.debug("REST request to get all SolRevisions");
        return solRevisionRepository.findAll();
    }

    /**
     * {@code GET  /sol-revisions/:id} : get the "id" solRevision.
     *
     * @param id the id of the solRevision to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the solRevision, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sol-revisions/{id}")
    public ResponseEntity<SolRevision> getSolRevision(@PathVariable Long id) {
        log.debug("REST request to get SolRevision : {}", id);
        Optional<SolRevision> solRevision = solRevisionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(solRevision);
    }

    /**
     * {@code DELETE  /sol-revisions/:id} : delete the "id" solRevision.
     *
     * @param id the id of the solRevision to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sol-revisions/{id}")
    public ResponseEntity<Void> deleteSolRevision(@PathVariable Long id) {
        log.debug("REST request to delete SolRevision : {}", id);
        solRevisionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
