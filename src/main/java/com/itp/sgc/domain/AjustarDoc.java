package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A AjustarDoc.
 */
@Entity
@Table(name = "ajustar_doc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AjustarDoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "id_user")
    private String idUser;

    @Column(name = "id_cargo")
    private Integer idCargo;

    @Column(name = "id_accion")
    private Integer idAccion;

    @Column(name = "id_doc")
    private Integer idDoc;

    @ManyToOne
    @JsonIgnoreProperties("ajustarDocs")
    private DocumentoSGC documentoSGC;

    @ManyToOne
    @JsonIgnoreProperties("ajustarDocs")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("ajustarDocs")
    private Cargo cargo;

    @ManyToOne
    @JsonIgnoreProperties("ajustarDocs")
    private AccionDoc accionDoc;

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

    public AjustarDoc code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getIdUser() {
        return idUser;
    }

    public AjustarDoc idUser(String idUser) {
        this.idUser = idUser;
        return this;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public Integer getIdCargo() {
        return idCargo;
    }

    public AjustarDoc idCargo(Integer idCargo) {
        this.idCargo = idCargo;
        return this;
    }

    public void setIdCargo(Integer idCargo) {
        this.idCargo = idCargo;
    }

    public Integer getIdAccion() {
        return idAccion;
    }

    public AjustarDoc idAccion(Integer idAccion) {
        this.idAccion = idAccion;
        return this;
    }

    public void setIdAccion(Integer idAccion) {
        this.idAccion = idAccion;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public AjustarDoc idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public DocumentoSGC getDocumentoSGC() {
        return documentoSGC;
    }

    public AjustarDoc documentoSGC(DocumentoSGC documentoSGC) {
        this.documentoSGC = documentoSGC;
        return this;
    }

    public void setDocumentoSGC(DocumentoSGC documentoSGC) {
        this.documentoSGC = documentoSGC;
    }

    public User getUser() {
        return user;
    }

    public AjustarDoc user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public AjustarDoc cargo(Cargo cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public AccionDoc getAccionDoc() {
        return accionDoc;
    }

    public AjustarDoc accionDoc(AccionDoc accionDoc) {
        this.accionDoc = accionDoc;
        return this;
    }

    public void setAccionDoc(AccionDoc accionDoc) {
        this.accionDoc = accionDoc;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AjustarDoc)) {
            return false;
        }
        return id != null && id.equals(((AjustarDoc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AjustarDoc{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", idUser='" + getIdUser() + "'" +
            ", idCargo=" + getIdCargo() +
            ", idAccion=" + getIdAccion() +
            ", idDoc=" + getIdDoc() +
            "}";
    }
}
