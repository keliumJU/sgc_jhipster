package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Formatos.
 */
@Entity
@Table(name = "formatos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Formatos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom_formato")
    private String nomFormato;

    @Lob
    @Column(name = "ruta_formato")
    private byte[] rutaFormato;

    @Column(name = "ruta_formato_content_type")
    private String rutaFormatoContentType;

    @Column(name = "id_doc")
    private Integer idDoc;

    @ManyToOne
    @JsonIgnoreProperties("formatos")
    private DocumentoSGC documentoSGC;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomFormato() {
        return nomFormato;
    }

    public Formatos nomFormato(String nomFormato) {
        this.nomFormato = nomFormato;
        return this;
    }

    public void setNomFormato(String nomFormato) {
        this.nomFormato = nomFormato;
    }

    public byte[] getRutaFormato() {
        return rutaFormato;
    }

    public Formatos rutaFormato(byte[] rutaFormato) {
        this.rutaFormato = rutaFormato;
        return this;
    }

    public void setRutaFormato(byte[] rutaFormato) {
        this.rutaFormato = rutaFormato;
    }

    public String getRutaFormatoContentType() {
        return rutaFormatoContentType;
    }

    public Formatos rutaFormatoContentType(String rutaFormatoContentType) {
        this.rutaFormatoContentType = rutaFormatoContentType;
        return this;
    }

    public void setRutaFormatoContentType(String rutaFormatoContentType) {
        this.rutaFormatoContentType = rutaFormatoContentType;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public Formatos idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public DocumentoSGC getDocumentoSGC() {
        return documentoSGC;
    }

    public Formatos documentoSGC(DocumentoSGC documentoSGC) {
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
        if (!(o instanceof Formatos)) {
            return false;
        }
        return id != null && id.equals(((Formatos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Formatos{" +
            "id=" + getId() +
            ", nomFormato='" + getNomFormato() + "'" +
            ", rutaFormato='" + getRutaFormato() + "'" +
            ", rutaFormatoContentType='" + getRutaFormatoContentType() + "'" +
            ", idDoc=" + getIdDoc() +
            "}";
    }
}
