package com.itp.sgc.web.rest;

import com.itp.sgc.domain.EstadoDoc;
import com.itp.sgc.repository.EstadoDocRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.EstadoDoc}.
 */
@RestController
@RequestMapping("/api")
public class EstadoDocResource {

    private final Logger log = LoggerFactory.getLogger(EstadoDocResource.class);

    private static final String ENTITY_NAME = "estadoDoc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoDocRepository estadoDocRepository;

    public EstadoDocResource(EstadoDocRepository estadoDocRepository) {
        this.estadoDocRepository = estadoDocRepository;
    }

    /**
     * {@code POST  /estado-docs} : Create a new estadoDoc.
     *
     * @param estadoDoc the estadoDoc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoDoc, or with status {@code 400 (Bad Request)} if the estadoDoc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-docs")
    public ResponseEntity<EstadoDoc> createEstadoDoc(@RequestBody EstadoDoc estadoDoc) throws URISyntaxException {
        log.debug("REST request to save EstadoDoc : {}", estadoDoc);
        if (estadoDoc.getId() != null) {
            throw new BadRequestAlertException("A new estadoDoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoDoc result = estadoDocRepository.save(estadoDoc);
        return ResponseEntity.created(new URI("/api/estado-docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-docs} : Updates an existing estadoDoc.
     *
     * @param estadoDoc the estadoDoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoDoc,
     * or with status {@code 400 (Bad Request)} if the estadoDoc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoDoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-docs")
    public ResponseEntity<EstadoDoc> updateEstadoDoc(@RequestBody EstadoDoc estadoDoc) throws URISyntaxException {
        log.debug("REST request to update EstadoDoc : {}", estadoDoc);
        if (estadoDoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoDoc result = estadoDocRepository.save(estadoDoc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estadoDoc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estado-docs} : get all the estadoDocs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoDocs in body.
     */
    @GetMapping("/estado-docs")
    public List<EstadoDoc> getAllEstadoDocs() {
        log.debug("REST request to get all EstadoDocs");
        return estadoDocRepository.findAll();
    }

    /**
     * {@code GET  /estado-docs/:id} : get the "id" estadoDoc.
     *
     * @param id the id of the estadoDoc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoDoc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-docs/{id}")
    public ResponseEntity<EstadoDoc> getEstadoDoc(@PathVariable Long id) {
        log.debug("REST request to get EstadoDoc : {}", id);
        Optional<EstadoDoc> estadoDoc = estadoDocRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estadoDoc);
    }

    /**
     * {@code DELETE  /estado-docs/:id} : delete the "id" estadoDoc.
     *
     * @param id the id of the estadoDoc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-docs/{id}")
    public ResponseEntity<Void> deleteEstadoDoc(@PathVariable Long id) {
        log.debug("REST request to delete EstadoDoc : {}", id);
        estadoDocRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
