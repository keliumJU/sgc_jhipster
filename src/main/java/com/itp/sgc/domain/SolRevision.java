package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SolRevision.
 */
@Entity
@Table(name = "sol_revision")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SolRevision implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "id_user")
    private Integer idUser;

    @Column(name = "id_sol")
    private Integer idSol;

    @Column(name = "estado")
    private Boolean estado;

    @ManyToOne
    @JsonIgnoreProperties("solRevisions")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("solRevisions")
    private Solicitud solicitud;

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

    public SolRevision code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public SolRevision idUser(Integer idUser) {
        this.idUser = idUser;
        return this;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public Integer getIdSol() {
        return idSol;
    }

    public SolRevision idSol(Integer idSol) {
        this.idSol = idSol;
        return this;
    }

    public void setIdSol(Integer idSol) {
        this.idSol = idSol;
    }

    public Boolean isEstado() {
        return estado;
    }

    public SolRevision estado(Boolean estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public User getUser() {
        return user;
    }

    public SolRevision user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Solicitud getSolicitud() {
        return solicitud;
    }

    public SolRevision solicitud(Solicitud solicitud) {
        this.solicitud = solicitud;
        return this;
    }

    public void setSolicitud(Solicitud solicitud) {
        this.solicitud = solicitud;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SolRevision)) {
            return false;
        }
        return id != null && id.equals(((SolRevision) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SolRevision{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", idUser=" + getIdUser() +
            ", idSol=" + getIdSol() +
            ", estado='" + isEstado() + "'" +
            "}";
    }
}
