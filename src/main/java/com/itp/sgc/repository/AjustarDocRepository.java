package com.itp.sgc.repository;

import com.itp.sgc.domain.AjustarDoc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the AjustarDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AjustarDocRepository extends JpaRepository<AjustarDoc, Long> {

    @Query("select ajustarDoc from AjustarDoc ajustarDoc where ajustarDoc.user.login = ?#{principal.username}")
    List<AjustarDoc> findByUserIsCurrentUser();

}
