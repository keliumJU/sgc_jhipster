package com.itp.sgc.web.rest;

import com.itp.sgc.domain.Formatos;
import com.itp.sgc.repository.FormatosRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.Formatos}.
 */
@RestController
@RequestMapping("/api")
public class FormatosResource {

    private final Logger log = LoggerFactory.getLogger(FormatosResource.class);

    private static final String ENTITY_NAME = "formatos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormatosRepository formatosRepository;

    public FormatosResource(FormatosRepository formatosRepository) {
        this.formatosRepository = formatosRepository;
    }

    /**
     * {@code POST  /formatos} : Create a new formatos.
     *
     * @param formatos the formatos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formatos, or with status {@code 400 (Bad Request)} if the formatos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/formatos")
    public ResponseEntity<Formatos> createFormatos(@RequestBody Formatos formatos) throws URISyntaxException {
        log.debug("REST request to save Formatos : {}", formatos);
        if (formatos.getId() != null) {
            throw new BadRequestAlertException("A new formatos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Formatos result = formatosRepository.save(formatos);
        return ResponseEntity.created(new URI("/api/formatos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /formatos} : Updates an existing formatos.
     *
     * @param formatos the formatos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formatos,
     * or with status {@code 400 (Bad Request)} if the formatos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the formatos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/formatos")
    public ResponseEntity<Formatos> updateFormatos(@RequestBody Formatos formatos) throws URISyntaxException {
        log.debug("REST request to update Formatos : {}", formatos);
        if (formatos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Formatos result = formatosRepository.save(formatos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, formatos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /formatos} : get all the formatos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of formatos in body.
     */
    @GetMapping("/formatos")
    public List<Formatos> getAllFormatos() {
        log.debug("REST request to get all Formatos");
        return formatosRepository.findAll();
    }

    /**
     * {@code GET  /formatos/:id} : get the "id" formatos.
     *
     * @param id the id of the formatos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the formatos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/formatos/{id}")
    public ResponseEntity<Formatos> getFormatos(@PathVariable Long id) {
        log.debug("REST request to get Formatos : {}", id);
        Optional<Formatos> formatos = formatosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(formatos);
    }

    /**
     * {@code DELETE  /formatos/:id} : delete the "id" formatos.
     *
     * @param id the id of the formatos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/formatos/{id}")
    public ResponseEntity<Void> deleteFormatos(@PathVariable Long id) {
        log.debug("REST request to delete Formatos : {}", id);
        formatosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
