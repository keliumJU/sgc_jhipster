package com.itp.sgc.repository;

import com.itp.sgc.domain.SolRevision;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SolRevision entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolRevisionRepository extends JpaRepository<SolRevision, Long> {

    @Query("select solRevision from SolRevision solRevision where solRevision.user.login = ?#{principal.username}")
    List<SolRevision> findByUserIsCurrentUser();

}
