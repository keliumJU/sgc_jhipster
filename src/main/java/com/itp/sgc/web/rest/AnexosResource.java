package com.itp.sgc.web.rest;

import com.itp.sgc.domain.Anexos;
import com.itp.sgc.repository.AnexosRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.Anexos}.
 */
@RestController
@RequestMapping("/api")
public class AnexosResource {

    private final Logger log = LoggerFactory.getLogger(AnexosResource.class);

    private static final String ENTITY_NAME = "anexos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnexosRepository anexosRepository;

    public AnexosResource(AnexosRepository anexosRepository) {
        this.anexosRepository = anexosRepository;
    }

    /**
     * {@code POST  /anexos} : Create a new anexos.
     *
     * @param anexos the anexos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new anexos, or with status {@code 400 (Bad Request)} if the anexos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/anexos")
    public ResponseEntity<Anexos> createAnexos(@RequestBody Anexos anexos) throws URISyntaxException {
        log.debug("REST request to save Anexos : {}", anexos);
        if (anexos.getId() != null) {
            throw new BadRequestAlertException("A new anexos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Anexos result = anexosRepository.save(anexos);
        return ResponseEntity.created(new URI("/api/anexos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /anexos} : Updates an existing anexos.
     *
     * @param anexos the anexos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated anexos,
     * or with status {@code 400 (Bad Request)} if the anexos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the anexos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/anexos")
    public ResponseEntity<Anexos> updateAnexos(@RequestBody Anexos anexos) throws URISyntaxException {
        log.debug("REST request to update Anexos : {}", anexos);
        if (anexos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Anexos result = anexosRepository.save(anexos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, anexos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /anexos} : get all the anexos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of anexos in body.
     */
    @GetMapping("/anexos")
    public List<Anexos> getAllAnexos() {
        log.debug("REST request to get all Anexos");
        return anexosRepository.findAll();
    }

    /**
     * {@code GET  /anexos/:id} : get the "id" anexos.
     *
     * @param id the id of the anexos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the anexos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/anexos/{id}")
    public ResponseEntity<Anexos> getAnexos(@PathVariable Long id) {
        log.debug("REST request to get Anexos : {}", id);
        Optional<Anexos> anexos = anexosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(anexos);
    }

    /**
     * {@code DELETE  /anexos/:id} : delete the "id" anexos.
     *
     * @param id the id of the anexos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/anexos/{id}")
    public ResponseEntity<Void> deleteAnexos(@PathVariable Long id) {
        log.debug("REST request to delete Anexos : {}", id);
        anexosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
