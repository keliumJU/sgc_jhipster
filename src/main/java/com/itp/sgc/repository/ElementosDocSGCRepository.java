package com.itp.sgc.repository;

import com.itp.sgc.domain.ElementosDocSGC;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ElementosDocSGC entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ElementosDocSGCRepository extends JpaRepository<ElementosDocSGC, Long> {

}
