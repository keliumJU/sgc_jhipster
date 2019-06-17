package com.itp.sgc.web.rest;

import com.itp.sgc.domain.TipoSolicitud;
import com.itp.sgc.repository.TipoSolicitudRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.TipoSolicitud}.
 */
@RestController
@RequestMapping("/api")
public class TipoSolicitudResource {

    private final Logger log = LoggerFactory.getLogger(TipoSolicitudResource.class);

    private static final String ENTITY_NAME = "tipoSolicitud";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoSolicitudRepository tipoSolicitudRepository;

    public TipoSolicitudResource(TipoSolicitudRepository tipoSolicitudRepository) {
        this.tipoSolicitudRepository = tipoSolicitudRepository;
    }

    /**
     * {@code POST  /tipo-solicituds} : Create a new tipoSolicitud.
     *
     * @param tipoSolicitud the tipoSolicitud to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoSolicitud, or with status {@code 400 (Bad Request)} if the tipoSolicitud has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-solicituds")
    public ResponseEntity<TipoSolicitud> createTipoSolicitud(@RequestBody TipoSolicitud tipoSolicitud) throws URISyntaxException {
        log.debug("REST request to save TipoSolicitud : {}", tipoSolicitud);
        if (tipoSolicitud.getId() != null) {
            throw new BadRequestAlertException("A new tipoSolicitud cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoSolicitud result = tipoSolicitudRepository.save(tipoSolicitud);
        return ResponseEntity.created(new URI("/api/tipo-solicituds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-solicituds} : Updates an existing tipoSolicitud.
     *
     * @param tipoSolicitud the tipoSolicitud to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoSolicitud,
     * or with status {@code 400 (Bad Request)} if the tipoSolicitud is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoSolicitud couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-solicituds")
    public ResponseEntity<TipoSolicitud> updateTipoSolicitud(@RequestBody TipoSolicitud tipoSolicitud) throws URISyntaxException {
        log.debug("REST request to update TipoSolicitud : {}", tipoSolicitud);
        if (tipoSolicitud.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoSolicitud result = tipoSolicitudRepository.save(tipoSolicitud);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoSolicitud.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-solicituds} : get all the tipoSolicituds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoSolicituds in body.
     */
    @GetMapping("/tipo-solicituds")
    public List<TipoSolicitud> getAllTipoSolicituds() {
        log.debug("REST request to get all TipoSolicituds");
        return tipoSolicitudRepository.findAll();
    }

    /**
     * {@code GET  /tipo-solicituds/:id} : get the "id" tipoSolicitud.
     *
     * @param id the id of the tipoSolicitud to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoSolicitud, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-solicituds/{id}")
    public ResponseEntity<TipoSolicitud> getTipoSolicitud(@PathVariable Long id) {
        log.debug("REST request to get TipoSolicitud : {}", id);
        Optional<TipoSolicitud> tipoSolicitud = tipoSolicitudRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoSolicitud);
    }

    /**
     * {@code DELETE  /tipo-solicituds/:id} : delete the "id" tipoSolicitud.
     *
     * @param id the id of the tipoSolicitud to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-solicituds/{id}")
    public ResponseEntity<Void> deleteTipoSolicitud(@PathVariable Long id) {
        log.debug("REST request to delete TipoSolicitud : {}", id);
        tipoSolicitudRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
