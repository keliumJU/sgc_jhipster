package com.itp.sgc.web.rest;

import com.itp.sgc.domain.Contenido;
import com.itp.sgc.repository.ContenidoRepository;
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
 * REST controller for managing {@link com.itp.sgc.domain.Contenido}.
 */
@RestController
@RequestMapping("/api")
public class ContenidoResource {

    private final Logger log = LoggerFactory.getLogger(ContenidoResource.class);

    private static final String ENTITY_NAME = "contenido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContenidoRepository contenidoRepository;

    public ContenidoResource(ContenidoRepository contenidoRepository) {
        this.contenidoRepository = contenidoRepository;
    }

    /**
     * {@code POST  /contenidos} : Create a new contenido.
     *
     * @param contenido the contenido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contenido, or with status {@code 400 (Bad Request)} if the contenido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contenidos")
    public ResponseEntity<Contenido> createContenido(@RequestBody Contenido contenido) throws URISyntaxException {
        log.debug("REST request to save Contenido : {}", contenido);
        if (contenido.getId() != null) {
            throw new BadRequestAlertException("A new contenido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contenido result = contenidoRepository.save(contenido);
        return ResponseEntity.created(new URI("/api/contenidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contenidos} : Updates an existing contenido.
     *
     * @param contenido the contenido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contenido,
     * or with status {@code 400 (Bad Request)} if the contenido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contenido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contenidos")
    public ResponseEntity<Contenido> updateContenido(@RequestBody Contenido contenido) throws URISyntaxException {
        log.debug("REST request to update Contenido : {}", contenido);
        if (contenido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contenido result = contenidoRepository.save(contenido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contenido.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contenidos} : get all the contenidos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contenidos in body.
     */
    @GetMapping("/contenidos")
    public List<Contenido> getAllContenidos() {
        log.debug("REST request to get all Contenidos");
        return contenidoRepository.findAll();
    }

    /**
     * {@code GET  /contenidos/:id} : get the "id" contenido.
     *
     * @param id the id of the contenido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contenido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contenidos/{id}")
    public ResponseEntity<Contenido> getContenido(@PathVariable Long id) {
        log.debug("REST request to get Contenido : {}", id);
        Optional<Contenido> contenido = contenidoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contenido);
    }

    /**
     * {@code DELETE  /contenidos/:id} : delete the "id" contenido.
     *
     * @param id the id of the contenido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contenidos/{id}")
    public ResponseEntity<Void> deleteContenido(@PathVariable Long id) {
        log.debug("REST request to delete Contenido : {}", id);
        contenidoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
