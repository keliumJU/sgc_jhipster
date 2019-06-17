package com.itp.sgc.repository;

import com.itp.sgc.domain.Elementos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Elementos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ElementosRepository extends JpaRepository<Elementos, Long> {

}
