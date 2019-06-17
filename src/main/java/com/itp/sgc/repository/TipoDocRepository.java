package com.itp.sgc.repository;

import com.itp.sgc.domain.TipoDoc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDocRepository extends JpaRepository<TipoDoc, Long> {

}
