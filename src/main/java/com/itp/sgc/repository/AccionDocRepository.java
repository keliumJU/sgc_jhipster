package com.itp.sgc.repository;

import com.itp.sgc.domain.AccionDoc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AccionDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccionDocRepository extends JpaRepository<AccionDoc, Long> {

}
