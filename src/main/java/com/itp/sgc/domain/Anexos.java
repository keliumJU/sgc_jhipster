package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Anexos.
 */
@Entity
@Table(name = "anexos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Anexos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom_anexo")
    private String nomAnexo;

    @Column(name = "descripcion")
    private String descripcion;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @Column(name = "id_padre")
    private Integer idPadre;

    @Column(name = "id_doc")
    private Integer idDoc;

    @ManyToOne
    @JsonIgnoreProperties("anexos")
    private DocumentoSGC documentoSGC;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomAnexo() {
        return nomAnexo;
    }

    public Anexos nomAnexo(String nomAnexo) {
        this.nomAnexo = nomAnexo;
        return this;
    }

    public void setNomAnexo(String nomAnexo) {
        this.nomAnexo = nomAnexo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Anexos descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImg() {
        return img;
    }

    public Anexos img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Anexos imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public Integer getIdPadre() {
        return idPadre;
    }

    public Anexos idPadre(Integer idPadre) {
        this.idPadre = idPadre;
        return this;
    }

    public void setIdPadre(Integer idPadre) {
        this.idPadre = idPadre;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public Anexos idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public DocumentoSGC getDocumentoSGC() {
        return documentoSGC;
    }

    public Anexos documentoSGC(DocumentoSGC documentoSGC) {
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
        if (!(o instanceof Anexos)) {
            return false;
        }
        return id != null && id.equals(((Anexos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Anexos{" +
            "id=" + getId() +
            ", nomAnexo='" + getNomAnexo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + getImgContentType() + "'" +
            ", idPadre=" + getIdPadre() +
            ", idDoc=" + getIdDoc() +
            "}";
    }
}
