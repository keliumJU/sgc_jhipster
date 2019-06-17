package com.itp.sgc.web.rest;

import com.itp.sgc.domain.AjustarDoc;
import com.itp.sgc.repository.AjustarDocRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.AjustarDoc}.
 */
@RestController
@RequestMapping("/api")
public class AjustarDocResource {

    private final Logger log = LoggerFactory.getLogger(AjustarDocResource.class);

    private static final String ENTITY_NAME = "ajustarDoc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AjustarDocRepository ajustarDocRepository;

    public AjustarDocResource(AjustarDocRepository ajustarDocRepository) {
        this.ajustarDocRepository = ajustarDocRepository;
    }

    /**
     * {@code POST  /ajustar-docs} : Create a new ajustarDoc.
     *
     * @param ajustarDoc the ajustarDoc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ajustarDoc, or with status {@code 400 (Bad Request)} if the ajustarDoc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ajustar-docs")
    public ResponseEntity<AjustarDoc> createAjustarDoc(@RequestBody AjustarDoc ajustarDoc) throws URISyntaxException {
        log.debug("REST request to save AjustarDoc : {}", ajustarDoc);
        if (ajustarDoc.getId() != null) {
            throw new BadRequestAlertException("A new ajustarDoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AjustarDoc result = ajustarDocRepository.save(ajustarDoc);
        return ResponseEntity.created(new URI("/api/ajustar-docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ajustar-docs} : Updates an existing ajustarDoc.
     *
     * @param ajustarDoc the ajustarDoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ajustarDoc,
     * or with status {@code 400 (Bad Request)} if the ajustarDoc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ajustarDoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ajustar-docs")
    public ResponseEntity<AjustarDoc> updateAjustarDoc(@RequestBody AjustarDoc ajustarDoc) throws URISyntaxException {
        log.debug("REST request to update AjustarDoc : {}", ajustarDoc);
        if (ajustarDoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AjustarDoc result = ajustarDocRepository.save(ajustarDoc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ajustarDoc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ajustar-docs} : get all the ajustarDocs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ajustarDocs in body.
     */
    @GetMapping("/ajustar-docs")
    public List<AjustarDoc> getAllAjustarDocs() {
        log.debug("REST request to get all AjustarDocs");
        return ajustarDocRepository.findAll();
    }

    /**
     * {@code GET  /ajustar-docs/:id} : get the "id" ajustarDoc.
     *
     * @param id the id of the ajustarDoc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ajustarDoc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ajustar-docs/{id}")
    public ResponseEntity<AjustarDoc> getAjustarDoc(@PathVariable Long id) {
        log.debug("REST request to get AjustarDoc : {}", id);
        Optional<AjustarDoc> ajustarDoc = ajustarDocRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ajustarDoc);
    }

    /**
     * {@code DELETE  /ajustar-docs/:id} : delete the "id" ajustarDoc.
     *
     * @param id the id of the ajustarDoc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ajustar-docs/{id}")
    public ResponseEntity<Void> deleteAjustarDoc(@PathVariable Long id) {
        log.debug("REST request to delete AjustarDoc : {}", id);
        ajustarDocRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
