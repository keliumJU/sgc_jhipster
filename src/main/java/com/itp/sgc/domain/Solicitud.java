package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Solicitud.
 */
@Entity
@Table(name = "solicitud")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Solicitud implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "id_proceso")
    private Integer idProceso;

    @Column(name = "id_tipo_doc")
    private Integer idTipoDoc;

    @Column(name = "id_tipo_sol")
    private Integer idTipoSol;

    @Column(name = "fecha_sol")
    private LocalDate fechaSol;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "id_doc")
    private Integer idDoc;

    @ManyToOne
    @JsonIgnoreProperties("solicituds")
    private Proceso proceso;

    @ManyToOne
    @JsonIgnoreProperties("solicituds")
    private TipoDoc tipoDoc;

    @ManyToOne
    @JsonIgnoreProperties("solicituds")
    private TipoSolicitud tipoSolicitud;

    @ManyToOne
    @JsonIgnoreProperties("solicituds")
    private DocumentoSGC documentoSGC;

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

    public Solicitud code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getIdProceso() {
        return idProceso;
    }

    public Solicitud idProceso(Integer idProceso) {
        this.idProceso = idProceso;
        return this;
    }

    public void setIdProceso(Integer idProceso) {
        this.idProceso = idProceso;
    }

    public Integer getIdTipoDoc() {
        return idTipoDoc;
    }

    public Solicitud idTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
        return this;
    }

    public void setIdTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
    }

    public Integer getIdTipoSol() {
        return idTipoSol;
    }

    public Solicitud idTipoSol(Integer idTipoSol) {
        this.idTipoSol = idTipoSol;
        return this;
    }

    public void setIdTipoSol(Integer idTipoSol) {
        this.idTipoSol = idTipoSol;
    }

    public LocalDate getFechaSol() {
        return fechaSol;
    }

    public Solicitud fechaSol(LocalDate fechaSol) {
        this.fechaSol = fechaSol;
        return this;
    }

    public void setFechaSol(LocalDate fechaSol) {
        this.fechaSol = fechaSol;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Solicitud descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public Solicitud idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public Proceso getProceso() {
        return proceso;
    }

    public Solicitud proceso(Proceso proceso) {
        this.proceso = proceso;
        return this;
    }

    public void setProceso(Proceso proceso) {
        this.proceso = proceso;
    }

    public TipoDoc getTipoDoc() {
        return tipoDoc;
    }

    public Solicitud tipoDoc(TipoDoc tipoDoc) {
        this.tipoDoc = tipoDoc;
        return this;
    }

    public void setTipoDoc(TipoDoc tipoDoc) {
        this.tipoDoc = tipoDoc;
    }

    public TipoSolicitud getTipoSolicitud() {
        return tipoSolicitud;
    }

    public Solicitud tipoSolicitud(TipoSolicitud tipoSolicitud) {
        this.tipoSolicitud = tipoSolicitud;
        return this;
    }

    public void setTipoSolicitud(TipoSolicitud tipoSolicitud) {
        this.tipoSolicitud = tipoSolicitud;
    }

    public DocumentoSGC getDocumentoSGC() {
        return documentoSGC;
    }

    public Solicitud documentoSGC(DocumentoSGC documentoSGC) {
        this.documentoSGC = documentoSGC;
        return this;
    }

    public void setDocumentoSGC(DocumentoSGC documentoSGC) {
        this.documentoSGC = documentoSGC;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Solicitud)) {
            return false;
        }
        return id != null && id.equals(((Solicitud) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Solicitud{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", idProceso=" + getIdProceso() +
            ", idTipoDoc=" + getIdTipoDoc() +
            ", idTipoSol=" + getIdTipoSol() +
            ", fechaSol='" + getFechaSol() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", idDoc=" + getIdDoc() +
            "}";
    }
}
