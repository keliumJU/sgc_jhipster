package com.itp.sgc.web.rest;

import com.itp.sgc.domain.AccionDoc;
import com.itp.sgc.repository.AccionDocRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.AccionDoc}.
 */
@RestController
@RequestMapping("/api")
public class AccionDocResource {

    private final Logger log = LoggerFactory.getLogger(AccionDocResource.class);

    private static final String ENTITY_NAME = "accionDoc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccionDocRepository accionDocRepository;

    public AccionDocResource(AccionDocRepository accionDocRepository) {
        this.accionDocRepository = accionDocRepository;
    }

    /**
     * {@code POST  /accion-docs} : Create a new accionDoc.
     *
     * @param accionDoc the accionDoc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accionDoc, or with status {@code 400 (Bad Request)} if the accionDoc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/accion-docs")
    public ResponseEntity<AccionDoc> createAccionDoc(@RequestBody AccionDoc accionDoc) throws URISyntaxException {
        log.debug("REST request to save AccionDoc : {}", accionDoc);
        if (accionDoc.getId() != null) {
            throw new BadRequestAlertException("A new accionDoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccionDoc result = accionDocRepository.save(accionDoc);
        return ResponseEntity.created(new URI("/api/accion-docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /accion-docs} : Updates an existing accionDoc.
     *
     * @param accionDoc the accionDoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accionDoc,
     * or with status {@code 400 (Bad Request)} if the accionDoc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accionDoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/accion-docs")
    public ResponseEntity<AccionDoc> updateAccionDoc(@RequestBody AccionDoc accionDoc) throws URISyntaxException {
        log.debug("REST request to update AccionDoc : {}", accionDoc);
        if (accionDoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccionDoc result = accionDocRepository.save(accionDoc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accionDoc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /accion-docs} : get all the accionDocs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accionDocs in body.
     */
    @GetMapping("/accion-docs")
    public List<AccionDoc> getAllAccionDocs() {
        log.debug("REST request to get all AccionDocs");
        return accionDocRepository.findAll();
    }

    /**
     * {@code GET  /accion-docs/:id} : get the "id" accionDoc.
     *
     * @param id the id of the accionDoc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accionDoc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/accion-docs/{id}")
    public ResponseEntity<AccionDoc> getAccionDoc(@PathVariable Long id) {
        log.debug("REST request to get AccionDoc : {}", id);
        Optional<AccionDoc> accionDoc = accionDocRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accionDoc);
    }

    /**
     * {@code DELETE  /accion-docs/:id} : delete the "id" accionDoc.
     *
     * @param id the id of the accionDoc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/accion-docs/{id}")
    public ResponseEntity<Void> deleteAccionDoc(@PathVariable Long id) {
        log.debug("REST request to delete AccionDoc : {}", id);
        accionDocRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
