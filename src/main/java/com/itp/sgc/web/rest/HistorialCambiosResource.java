package com.itp.sgc.web.rest;

import com.itp.sgc.domain.HistorialCambios;
import com.itp.sgc.repository.HistorialCambiosRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.HistorialCambios}.
 */
@RestController
@RequestMapping("/api")
public class HistorialCambiosResource {

    private final Logger log = LoggerFactory.getLogger(HistorialCambiosResource.class);

    private static final String ENTITY_NAME = "historialCambios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistorialCambiosRepository historialCambiosRepository;

    public HistorialCambiosResource(HistorialCambiosRepository historialCambiosRepository) {
        this.historialCambiosRepository = historialCambiosRepository;
    }

    /**
     * {@code POST  /historial-cambios} : Create a new historialCambios.
     *
     * @param historialCambios the historialCambios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historialCambios, or with status {@code 400 (Bad Request)} if the historialCambios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historial-cambios")
    public ResponseEntity<HistorialCambios> createHistorialCambios(@RequestBody HistorialCambios historialCambios) throws URISyntaxException {
        log.debug("REST request to save HistorialCambios : {}", historialCambios);
        if (historialCambios.getId() != null) {
            throw new BadRequestAlertException("A new historialCambios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistorialCambios result = historialCambiosRepository.save(historialCambios);
        return ResponseEntity.created(new URI("/api/historial-cambios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /historial-cambios} : Updates an existing historialCambios.
     *
     * @param historialCambios the historialCambios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historialCambios,
     * or with status {@code 400 (Bad Request)} if the historialCambios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historialCambios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historial-cambios")
    public ResponseEntity<HistorialCambios> updateHistorialCambios(@RequestBody HistorialCambios historialCambios) throws URISyntaxException {
        log.debug("REST request to update HistorialCambios : {}", historialCambios);
        if (historialCambios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistorialCambios result = historialCambiosRepository.save(historialCambios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, historialCambios.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /historial-cambios} : get all the historialCambios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of historialCambios in body.
     */
    @GetMapping("/historial-cambios")
    public List<HistorialCambios> getAllHistorialCambios() {
        log.debug("REST request to get all HistorialCambios");
        return historialCambiosRepository.findAll();
    }

    /**
     * {@code GET  /historial-cambios/:id} : get the "id" historialCambios.
     *
     * @param id the id of the historialCambios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historialCambios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/historial-cambios/{id}")
    public ResponseEntity<HistorialCambios> getHistorialCambios(@PathVariable Long id) {
        log.debug("REST request to get HistorialCambios : {}", id);
        Optional<HistorialCambios> historialCambios = historialCambiosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(historialCambios);
    }

    /**
     * {@code DELETE  /historial-cambios/:id} : delete the "id" historialCambios.
     *
     * @param id the id of the historialCambios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/historial-cambios/{id}")
    public ResponseEntity<Void> deleteHistorialCambios(@PathVariable Long id) {
        log.debug("REST request to delete HistorialCambios : {}", id);
        historialCambiosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
