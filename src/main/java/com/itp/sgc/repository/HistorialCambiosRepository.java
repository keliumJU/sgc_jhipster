package com.itp.sgc.repository;

import com.itp.sgc.domain.HistorialCambios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HistorialCambios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistorialCambiosRepository extends JpaRepository<HistorialCambios, Long> {

}
