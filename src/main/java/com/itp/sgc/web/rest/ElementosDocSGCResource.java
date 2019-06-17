package com.itp.sgc.web.rest;

import com.itp.sgc.domain.ElementosDocSGC;
import com.itp.sgc.repository.ElementosDocSGCRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.ElementosDocSGC}.
 */
@RestController
@RequestMapping("/api")
public class ElementosDocSGCResource {

    private final Logger log = LoggerFactory.getLogger(ElementosDocSGCResource.class);

    private static final String ENTITY_NAME = "elementosDocSGC";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ElementosDocSGCRepository elementosDocSGCRepository;

    public ElementosDocSGCResource(ElementosDocSGCRepository elementosDocSGCRepository) {
        this.elementosDocSGCRepository = elementosDocSGCRepository;
    }

    /**
     * {@code POST  /elementos-doc-sgcs} : Create a new elementosDocSGC.
     *
     * @param elementosDocSGC the elementosDocSGC to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new elementosDocSGC, or with status {@code 400 (Bad Request)} if the elementosDocSGC has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/elementos-doc-sgcs")
    public ResponseEntity<ElementosDocSGC> createElementosDocSGC(@RequestBody ElementosDocSGC elementosDocSGC) throws URISyntaxException {
        log.debug("REST request to save ElementosDocSGC : {}", elementosDocSGC);
        if (elementosDocSGC.getId() != null) {
            throw new BadRequestAlertException("A new elementosDocSGC cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ElementosDocSGC result = elementosDocSGCRepository.save(elementosDocSGC);
        return ResponseEntity.created(new URI("/api/elementos-doc-sgcs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /elementos-doc-sgcs} : Updates an existing elementosDocSGC.
     *
     * @param elementosDocSGC the elementosDocSGC to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated elementosDocSGC,
     * or with status {@code 400 (Bad Request)} if the elementosDocSGC is not valid,
     * or with status {@code 500 (Internal Server Error)} if the elementosDocSGC couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/elementos-doc-sgcs")
    public ResponseEntity<ElementosDocSGC> updateElementosDocSGC(@RequestBody ElementosDocSGC elementosDocSGC) throws URISyntaxException {
        log.debug("REST request to update ElementosDocSGC : {}", elementosDocSGC);
        if (elementosDocSGC.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ElementosDocSGC result = elementosDocSGCRepository.save(elementosDocSGC);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, elementosDocSGC.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /elementos-doc-sgcs} : get all the elementosDocSGCS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of elementosDocSGCS in body.
     */
    @GetMapping("/elementos-doc-sgcs")
    public List<ElementosDocSGC> getAllElementosDocSGCS() {
        log.debug("REST request to get all ElementosDocSGCS");
        return elementosDocSGCRepository.findAll();
    }

    /**
     * {@code GET  /elementos-doc-sgcs/:id} : get the "id" elementosDocSGC.
     *
     * @param id the id of the elementosDocSGC to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the elementosDocSGC, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/elementos-doc-sgcs/{id}")
    public ResponseEntity<ElementosDocSGC> getElementosDocSGC(@PathVariable Long id) {
        log.debug("REST request to get ElementosDocSGC : {}", id);
        Optional<ElementosDocSGC> elementosDocSGC = elementosDocSGCRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(elementosDocSGC);
    }

    /**
     * {@code DELETE  /elementos-doc-sgcs/:id} : delete the "id" elementosDocSGC.
     *
     * @param id the id of the elementosDocSGC to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/elementos-doc-sgcs/{id}")
    public ResponseEntity<Void> deleteElementosDocSGC(@PathVariable Long id) {
        log.debug("REST request to delete ElementosDocSGC : {}", id);
        elementosDocSGCRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
