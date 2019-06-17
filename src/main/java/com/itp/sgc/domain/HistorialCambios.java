package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A HistorialCambios.
 */
@Entity
@Table(name = "historial_cambios")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistorialCambios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "actividad")
    private String actividad;

    @Column(name = "cambio")
    private String cambio;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "v_vigente")
    private LocalDate vVigente;

    @Column(name = "v_obsoleta")
    private LocalDate vObsoleta;

    @Column(name = "id_doc")
    private Integer idDoc;

    @Lob
    @Column(name = "ruta")
    private byte[] ruta;

    @Column(name = "ruta_content_type")
    private String rutaContentType;

    @ManyToOne
    @JsonIgnoreProperties("historialCambios")
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

    public HistorialCambios code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getActividad() {
        return actividad;
    }

    public HistorialCambios actividad(String actividad) {
        this.actividad = actividad;
        return this;
    }

    public void setActividad(String actividad) {
        this.actividad = actividad;
    }

    public String getCambio() {
        return cambio;
    }

    public HistorialCambios cambio(String cambio) {
        this.cambio = cambio;
        return this;
    }

    public void setCambio(String cambio) {
        this.cambio = cambio;
    }

    public Instant getFecha() {
        return fecha;
    }

    public HistorialCambios fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public LocalDate getvVigente() {
        return vVigente;
    }

    public HistorialCambios vVigente(LocalDate vVigente) {
        this.vVigente = vVigente;
        return this;
    }

    public void setvVigente(LocalDate vVigente) {
        this.vVigente = vVigente;
    }

    public LocalDate getvObsoleta() {
        return vObsoleta;
    }

    public HistorialCambios vObsoleta(LocalDate vObsoleta) {
        this.vObsoleta = vObsoleta;
        return this;
    }

    public void setvObsoleta(LocalDate vObsoleta) {
        this.vObsoleta = vObsoleta;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public HistorialCambios idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public byte[] getRuta() {
        return ruta;
    }

    public HistorialCambios ruta(byte[] ruta) {
        this.ruta = ruta;
        return this;
    }

    public void setRuta(byte[] ruta) {
        this.ruta = ruta;
    }

    public String getRutaContentType() {
        return rutaContentType;
    }

    public HistorialCambios rutaContentType(String rutaContentType) {
        this.rutaContentType = rutaContentType;
        return this;
    }

    public void setRutaContentType(String rutaContentType) {
        this.rutaContentType = rutaContentType;
    }

    public DocumentoSGC getDocumentoSGC() {
        return documentoSGC;
    }

    public HistorialCambios documentoSGC(DocumentoSGC documentoSGC) {
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
        if (!(o instanceof HistorialCambios)) {
            return false;
        }
        return id != null && id.equals(((HistorialCambios) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HistorialCambios{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", actividad='" + getActividad() + "'" +
            ", cambio='" + getCambio() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", vVigente='" + getvVigente() + "'" +
            ", vObsoleta='" + getvObsoleta() + "'" +
            ", idDoc=" + getIdDoc() +
            ", ruta='" + getRuta() + "'" +
            ", rutaContentType='" + getRutaContentType() + "'" +
            "}";
    }
}
