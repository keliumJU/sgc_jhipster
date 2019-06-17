package com.itp.sgc.repository;

import com.itp.sgc.domain.DocRevision;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the DocRevision entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocRevisionRepository extends JpaRepository<DocRevision, Long> {

    @Query("select docRevision from DocRevision docRevision where docRevision.user.login = ?#{principal.username}")
    List<DocRevision> findByUserIsCurrentUser();

}
