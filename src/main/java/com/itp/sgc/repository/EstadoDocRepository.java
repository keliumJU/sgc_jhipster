package com.itp.sgc.repository;

import com.itp.sgc.domain.EstadoDoc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoDocRepository extends JpaRepository<EstadoDoc, Long> {

}
