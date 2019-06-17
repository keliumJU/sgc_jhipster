package com.itp.sgc.web.rest;

import com.itp.sgc.domain.DocRevision;
import com.itp.sgc.repository.DocRevisionRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.DocRevision}.
 */
@RestController
@RequestMapping("/api")
public class DocRevisionResource {

    private final Logger log = LoggerFactory.getLogger(DocRevisionResource.class);

    private static final String ENTITY_NAME = "docRevision";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocRevisionRepository docRevisionRepository;

    public DocRevisionResource(DocRevisionRepository docRevisionRepository) {
        this.docRevisionRepository = docRevisionRepository;
    }

    /**
     * {@code POST  /doc-revisions} : Create a new docRevision.
     *
     * @param docRevision the docRevision to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new docRevision, or with status {@code 400 (Bad Request)} if the docRevision has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/doc-revisions")
    public ResponseEntity<DocRevision> createDocRevision(@RequestBody DocRevision docRevision) throws URISyntaxException {
        log.debug("REST request to save DocRevision : {}", docRevision);
        if (docRevision.getId() != null) {
            throw new BadRequestAlertException("A new docRevision cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocRevision result = docRevisionRepository.save(docRevision);
        return ResponseEntity.created(new URI("/api/doc-revisions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /doc-revisions} : Updates an existing docRevision.
     *
     * @param docRevision the docRevision to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated docRevision,
     * or with status {@code 400 (Bad Request)} if the docRevision is not valid,
     * or with status {@code 500 (Internal Server Error)} if the docRevision couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/doc-revisions")
    public ResponseEntity<DocRevision> updateDocRevision(@RequestBody DocRevision docRevision) throws URISyntaxException {
        log.debug("REST request to update DocRevision : {}", docRevision);
        if (docRevision.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocRevision result = docRevisionRepository.save(docRevision);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, docRevision.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /doc-revisions} : get all the docRevisions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of docRevisions in body.
     */
    @GetMapping("/doc-revisions")
    public List<DocRevision> getAllDocRevisions() {
        log.debug("REST request to get all DocRevisions");
        return docRevisionRepository.findAll();
    }

    /**
     * {@code GET  /doc-revisions/:id} : get the "id" docRevision.
     *
     * @param id the id of the docRevision to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the docRevision, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/doc-revisions/{id}")
    public ResponseEntity<DocRevision> getDocRevision(@PathVariable Long id) {
        log.debug("REST request to get DocRevision : {}", id);
        Optional<DocRevision> docRevision = docRevisionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(docRevision);
    }

    /**
     * {@code DELETE  /doc-revisions/:id} : delete the "id" docRevision.
     *
     * @param id the id of the docRevision to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/doc-revisions/{id}")
    public ResponseEntity<Void> deleteDocRevision(@PathVariable Long id) {
        log.debug("REST request to delete DocRevision : {}", id);
        docRevisionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
