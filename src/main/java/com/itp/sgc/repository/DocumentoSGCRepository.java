package com.itp.sgc.repository;

import com.itp.sgc.domain.DocumentoSGC;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocumentoSGC entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentoSGCRepository extends JpaRepository<DocumentoSGC, Long> {

}
