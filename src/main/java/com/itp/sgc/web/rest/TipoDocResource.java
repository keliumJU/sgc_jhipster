package com.itp.sgc.web.rest;

import com.itp.sgc.domain.TipoDoc;
import com.itp.sgc.repository.TipoDocRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.TipoDoc}.
 */
@RestController
@RequestMapping("/api")
public class TipoDocResource {

    private final Logger log = LoggerFactory.getLogger(TipoDocResource.class);

    private static final String ENTITY_NAME = "tipoDoc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDocRepository tipoDocRepository;

    public TipoDocResource(TipoDocRepository tipoDocRepository) {
        this.tipoDocRepository = tipoDocRepository;
    }

    /**
     * {@code POST  /tipo-docs} : Create a new tipoDoc.
     *
     * @param tipoDoc the tipoDoc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDoc, or with status {@code 400 (Bad Request)} if the tipoDoc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-docs")
    public ResponseEntity<TipoDoc> createTipoDoc(@RequestBody TipoDoc tipoDoc) throws URISyntaxException {
        log.debug("REST request to save TipoDoc : {}", tipoDoc);
        if (tipoDoc.getId() != null) {
            throw new BadRequestAlertException("A new tipoDoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDoc result = tipoDocRepository.save(tipoDoc);
        return ResponseEntity.created(new URI("/api/tipo-docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-docs} : Updates an existing tipoDoc.
     *
     * @param tipoDoc the tipoDoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDoc,
     * or with status {@code 400 (Bad Request)} if the tipoDoc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-docs")
    public ResponseEntity<TipoDoc> updateTipoDoc(@RequestBody TipoDoc tipoDoc) throws URISyntaxException {
        log.debug("REST request to update TipoDoc : {}", tipoDoc);
        if (tipoDoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoDoc result = tipoDocRepository.save(tipoDoc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDoc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-docs} : get all the tipoDocs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDocs in body.
     */
    @GetMapping("/tipo-docs")
    public List<TipoDoc> getAllTipoDocs() {
        log.debug("REST request to get all TipoDocs");
        return tipoDocRepository.findAll();
    }

    /**
     * {@code GET  /tipo-docs/:id} : get the "id" tipoDoc.
     *
     * @param id the id of the tipoDoc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDoc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-docs/{id}")
    public ResponseEntity<TipoDoc> getTipoDoc(@PathVariable Long id) {
        log.debug("REST request to get TipoDoc : {}", id);
        Optional<TipoDoc> tipoDoc = tipoDocRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoDoc);
    }

    /**
     * {@code DELETE  /tipo-docs/:id} : delete the "id" tipoDoc.
     *
     * @param id the id of the tipoDoc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-docs/{id}")
    public ResponseEntity<Void> deleteTipoDoc(@PathVariable Long id) {
        log.debug("REST request to delete TipoDoc : {}", id);
        tipoDocRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
