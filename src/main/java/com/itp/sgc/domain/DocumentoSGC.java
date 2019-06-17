package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A DocumentoSGC.
 */
@Entity
@Table(name = "documento_sgc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DocumentoSGC implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "id_proceso")
    private Integer idProceso;

    @Column(name = "id_tipo_doc")
    private Integer idTipoDoc;

    @NotNull
    @Column(name = "nom_doc", nullable = false)
    private String nomDoc;

    @Lob
    @Column(name = "ruta")
    private byte[] ruta;

    @Column(name = "ruta_content_type")
    private String rutaContentType;

    @Column(name = "id_estado")
    private Integer idEstado;

    @Column(name = "version")
    private Integer version;

    @ManyToOne
    @JsonIgnoreProperties("documentoSGCS")
    private EstadoDoc estadoDoc;

    @ManyToOne
    @JsonIgnoreProperties("documentoSGCS")
    private Proceso proceso;

    @ManyToOne
    @JsonIgnoreProperties("documentoSGCS")
    private TipoDoc tipoDoc;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public DocumentoSGC codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public Integer getIdProceso() {
        return idProceso;
    }

    public DocumentoSGC idProceso(Integer idProceso) {
        this.idProceso = idProceso;
        return this;
    }

    public void setIdProceso(Integer idProceso) {
        this.idProceso = idProceso;
    }

    public Integer getIdTipoDoc() {
        return idTipoDoc;
    }

    public DocumentoSGC idTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
        return this;
    }

    public void setIdTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
    }

    public String getNomDoc() {
        return nomDoc;
    }

    public DocumentoSGC nomDoc(String nomDoc) {
        this.nomDoc = nomDoc;
        return this;
    }

    public void setNomDoc(String nomDoc) {
        this.nomDoc = nomDoc;
    }

    public byte[] getRuta() {
        return ruta;
    }

    public DocumentoSGC ruta(byte[] ruta) {
        this.ruta = ruta;
        return this;
    }

    public void setRuta(byte[] ruta) {
        this.ruta = ruta;
    }

    public String getRutaContentType() {
        return rutaContentType;
    }

    public DocumentoSGC rutaContentType(String rutaContentType) {
        this.rutaContentType = rutaContentType;
        return this;
    }

    public void setRutaContentType(String rutaContentType) {
        this.rutaContentType = rutaContentType;
    }

    public Integer getIdEstado() {
        return idEstado;
    }

    public DocumentoSGC idEstado(Integer idEstado) {
        this.idEstado = idEstado;
        return this;
    }

    public void setIdEstado(Integer idEstado) {
        this.idEstado = idEstado;
    }

    public Integer getVersion() {
        return version;
    }

    public DocumentoSGC version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public EstadoDoc getEstadoDoc() {
        return estadoDoc;
    }

    public DocumentoSGC estadoDoc(EstadoDoc estadoDoc) {
        this.estadoDoc = estadoDoc;
        return this;
    }

    public void setEstadoDoc(EstadoDoc estadoDoc) {
        this.estadoDoc = estadoDoc;
    }

    public Proceso getProceso() {
        return proceso;
    }

    public DocumentoSGC proceso(Proceso proceso) {
        this.proceso = proceso;
        return this;
    }

    public void setProceso(Proceso proceso) {
        this.proceso = proceso;
    }

    public TipoDoc getTipoDoc() {
        return tipoDoc;
    }

    public DocumentoSGC tipoDoc(TipoDoc tipoDoc) {
        this.tipoDoc = tipoDoc;
        return this;
    }

    public void setTipoDoc(TipoDoc tipoDoc) {
        this.tipoDoc = tipoDoc;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentoSGC)) {
            return false;
        }
        return id != null && id.equals(((DocumentoSGC) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DocumentoSGC{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", idProceso=" + getIdProceso() +
            ", idTipoDoc=" + getIdTipoDoc() +
            ", nomDoc='" + getNomDoc() + "'" +
            ", ruta='" + getRuta() + "'" +
            ", rutaContentType='" + getRutaContentType() + "'" +
            ", idEstado=" + getIdEstado() +
            ", version=" + getVersion() +
            "}";
    }
}
