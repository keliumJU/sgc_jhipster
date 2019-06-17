package com.itp.sgc.repository;

import com.itp.sgc.domain.Anexos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Anexos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnexosRepository extends JpaRepository<Anexos, Long> {

}
