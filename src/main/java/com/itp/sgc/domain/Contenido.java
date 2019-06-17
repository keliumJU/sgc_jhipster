package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Contenido.
 */
@Entity
@Table(name = "contenido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contenido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "actividad")
    private String actividad;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "responsable")
    private String responsable;

    @Column(name = "registro")
    private String registro;

    @Column(name = "id_doc")
    private Integer idDoc;

    @ManyToOne
    @JsonIgnoreProperties("contenidos")
    private DocumentoSGC documentoSGC;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActividad() {
        return actividad;
    }

    public Contenido actividad(String actividad) {
        this.actividad = actividad;
        return this;
    }

    public void setActividad(String actividad) {
        this.actividad = actividad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Contenido descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getResponsable() {
        return responsable;
    }

    public Contenido responsable(String responsable) {
        this.responsable = responsable;
        return this;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getRegistro() {
        return registro;
    }

    public Contenido registro(String registro) {
        this.registro = registro;
        return this;
    }

    public void setRegistro(String registro) {
        this.registro = registro;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public Contenido idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public DocumentoSGC getDocumentoSGC() {
        return documentoSGC;
    }

    public Contenido documentoSGC(DocumentoSGC documentoSGC) {
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
        if (!(o instanceof Contenido)) {
            return false;
        }
        return id != null && id.equals(((Contenido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Contenido{" +
            "id=" + getId() +
            ", actividad='" + getActividad() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", responsable='" + getResponsable() + "'" +
            ", registro='" + getRegistro() + "'" +
            ", idDoc=" + getIdDoc() +
            "}";
    }
}
