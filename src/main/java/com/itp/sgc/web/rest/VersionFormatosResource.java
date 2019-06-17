package com.itp.sgc.web.rest;

import com.itp.sgc.domain.VersionFormatos;
import com.itp.sgc.repository.VersionFormatosRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.VersionFormatos}.
 */
@RestController
@RequestMapping("/api")
public class VersionFormatosResource {

    private final Logger log = LoggerFactory.getLogger(VersionFormatosResource.class);

    private static final String ENTITY_NAME = "versionFormatos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VersionFormatosRepository versionFormatosRepository;

    public VersionFormatosResource(VersionFormatosRepository versionFormatosRepository) {
        this.versionFormatosRepository = versionFormatosRepository;
    }

    /**
     * {@code POST  /version-formatos} : Create a new versionFormatos.
     *
     * @param versionFormatos the versionFormatos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new versionFormatos, or with status {@code 400 (Bad Request)} if the versionFormatos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/version-formatos")
    public ResponseEntity<VersionFormatos> createVersionFormatos(@RequestBody VersionFormatos versionFormatos) throws URISyntaxException {
        log.debug("REST request to save VersionFormatos : {}", versionFormatos);
        if (versionFormatos.getId() != null) {
            throw new BadRequestAlertException("A new versionFormatos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VersionFormatos result = versionFormatosRepository.save(versionFormatos);
        return ResponseEntity.created(new URI("/api/version-formatos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /version-formatos} : Updates an existing versionFormatos.
     *
     * @param versionFormatos the versionFormatos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated versionFormatos,
     * or with status {@code 400 (Bad Request)} if the versionFormatos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the versionFormatos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/version-formatos")
    public ResponseEntity<VersionFormatos> updateVersionFormatos(@RequestBody VersionFormatos versionFormatos) throws URISyntaxException {
        log.debug("REST request to update VersionFormatos : {}", versionFormatos);
        if (versionFormatos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VersionFormatos result = versionFormatosRepository.save(versionFormatos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, versionFormatos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /version-formatos} : get all the versionFormatos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of versionFormatos in body.
     */
    @GetMapping("/version-formatos")
    public List<VersionFormatos> getAllVersionFormatos() {
        log.debug("REST request to get all VersionFormatos");
        return versionFormatosRepository.findAll();
    }

    /**
     * {@code GET  /version-formatos/:id} : get the "id" versionFormatos.
     *
     * @param id the id of the versionFormatos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the versionFormatos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/version-formatos/{id}")
    public ResponseEntity<VersionFormatos> getVersionFormatos(@PathVariable Long id) {
        log.debug("REST request to get VersionFormatos : {}", id);
        Optional<VersionFormatos> versionFormatos = versionFormatosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(versionFormatos);
    }

    /**
     * {@code DELETE  /version-formatos/:id} : delete the "id" versionFormatos.
     *
     * @param id the id of the versionFormatos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/version-formatos/{id}")
    public ResponseEntity<Void> deleteVersionFormatos(@PathVariable Long id) {
        log.debug("REST request to delete VersionFormatos : {}", id);
        versionFormatosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
