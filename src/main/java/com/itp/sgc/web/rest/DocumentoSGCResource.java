package com.itp.sgc.web.rest;

import com.itp.sgc.domain.DocumentoSGC;
import com.itp.sgc.repository.DocumentoSGCRepository;
import com.itp.sgc.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.itp.sgc.domain.DocumentoSGC}.
 */
@RestController
@RequestMapping("/api")
public class DocumentoSGCResource {

    private final Logger log = LoggerFactory.getLogger(DocumentoSGCResource.class);

    private static final String ENTITY_NAME = "documentoSGC";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentoSGCRepository documentoSGCRepository;

    public DocumentoSGCResource(DocumentoSGCRepository documentoSGCRepository) {
        this.documentoSGCRepository = documentoSGCRepository;
    }

    /**
     * {@code POST  /documento-sgcs} : Create a new documentoSGC.
     *
     * @param documentoSGC the documentoSGC to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentoSGC, or with status {@code 400 (Bad Request)} if the documentoSGC has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/documento-sgcs")
    public ResponseEntity<DocumentoSGC> createDocumentoSGC(@Valid @RequestBody DocumentoSGC documentoSGC) throws URISyntaxException {
        log.debug("REST request to save DocumentoSGC : {}", documentoSGC);
        if (documentoSGC.getId() != null) {
            throw new BadRequestAlertException("A new documentoSGC cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentoSGC result = documentoSGCRepository.save(documentoSGC);
        return ResponseEntity.created(new URI("/api/documento-sgcs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /documento-sgcs} : Updates an existing documentoSGC.
     *
     * @param documentoSGC the documentoSGC to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentoSGC,
     * or with status {@code 400 (Bad Request)} if the documentoSGC is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentoSGC couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/documento-sgcs")
    public ResponseEntity<DocumentoSGC> updateDocumentoSGC(@Valid @RequestBody DocumentoSGC documentoSGC) throws URISyntaxException {
        log.debug("REST request to update DocumentoSGC : {}", documentoSGC);
        if (documentoSGC.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentoSGC result = documentoSGCRepository.save(documentoSGC);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documentoSGC.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /documento-sgcs} : get all the documentoSGCS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentoSGCS in body.
     */
    @GetMapping("/documento-sgcs")
    public List<DocumentoSGC> getAllDocumentoSGCS() {
        log.debug("REST request to get all DocumentoSGCS");
        return documentoSGCRepository.findAll();
    }

    /**
     * {@code GET  /documento-sgcs/:id} : get the "id" documentoSGC.
     *
     * @param id the id of the documentoSGC to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentoSGC, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/documento-sgcs/{id}")
    public ResponseEntity<DocumentoSGC> getDocumentoSGC(@PathVariable Long id) {
        log.debug("REST request to get DocumentoSGC : {}", id);
        Optional<DocumentoSGC> documentoSGC = documentoSGCRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentoSGC);
    }

    /**
     * {@code DELETE  /documento-sgcs/:id} : delete the "id" documentoSGC.
     *
     * @param id the id of the documentoSGC to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/documento-sgcs/{id}")
    public ResponseEntity<Void> deleteDocumentoSGC(@PathVariable Long id) {
        log.debug("REST request to delete DocumentoSGC : {}", id);
        documentoSGCRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
