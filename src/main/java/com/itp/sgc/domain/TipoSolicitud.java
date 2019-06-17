package com.itp.sgc.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TipoSolicitud.
 */
@Entity
@Table(name = "tipo_solicitud")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoSolicitud implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "tipo_sol")
    private String tipoSol;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public TipoSolicitud code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getTipoSol() {
        return tipoSol;
    }

    public TipoSolicitud tipoSol(String tipoSol) {
        this.tipoSol = tipoSol;
        return this;
    }

    public void setTipoSol(String tipoSol) {
        this.tipoSol = tipoSol;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoSolicitud)) {
            return false;
        }
        return id != null && id.equals(((TipoSolicitud) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoSolicitud{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", tipoSol='" + getTipoSol() + "'" +
            "}";
    }
}
