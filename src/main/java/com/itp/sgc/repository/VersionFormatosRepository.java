package com.itp.sgc.repository;

import com.itp.sgc.domain.VersionFormatos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VersionFormatos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VersionFormatosRepository extends JpaRepository<VersionFormatos, Long> {

}
