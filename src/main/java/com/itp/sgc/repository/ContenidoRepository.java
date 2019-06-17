package com.itp.sgc.repository;

import com.itp.sgc.domain.Contenido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Contenido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContenidoRepository extends JpaRepository<Contenido, Long> {

}
