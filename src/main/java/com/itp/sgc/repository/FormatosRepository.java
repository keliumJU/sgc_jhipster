package com.itp.sgc.repository;

import com.itp.sgc.domain.Formatos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Formatos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormatosRepository extends JpaRepository<Formatos, Long> {

}
