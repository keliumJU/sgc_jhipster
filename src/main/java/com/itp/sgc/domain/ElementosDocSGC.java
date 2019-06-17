package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ElementosDocSGC.
 */
@Entity
@Table(name = "elementos_doc_sgc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ElementosDocSGC implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_elemento")
    private Integer idElemento;

    @Column(name = "id_doc")
    private Integer idDoc;

    @Column(name = "valor")
    private String valor;

    @ManyToOne
    @JsonIgnoreProperties("elementosDocSGCS")
    private DocumentoSGC documentoDocSGC;

    @ManyToOne
    @JsonIgnoreProperties("elementosDocSGCS")
    private Elementos elementos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdElemento() {
        return idElemento;
    }

    public ElementosDocSGC idElemento(Integer idElemento) {
        this.idElemento = idElemento;
        return this;
    }

    public void setIdElemento(Integer idElemento) {
        this.idElemento = idElemento;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public ElementosDocSGC idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public String getValor() {
        return valor;
    }

    public ElementosDocSGC valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public DocumentoSGC getDocumentoDocSGC() {
        return documentoDocSGC;
    }

    public ElementosDocSGC documentoDocSGC(DocumentoSGC documentoSGC) {
        this.documentoDocSGC = documentoSGC;
        return this;
    }

    public void setDocumentoDocSGC(DocumentoSGC documentoSGC) {
        this.documentoDocSGC = documentoSGC;
    }

    public Elementos getElementos() {
        return elementos;
    }

    public ElementosDocSGC elementos(Elementos elementos) {
        this.elementos = elementos;
        return this;
    }

    public void setElementos(Elementos elementos) {
        this.elementos = elementos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ElementosDocSGC)) {
            return false;
        }
        return id != null && id.equals(((ElementosDocSGC) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ElementosDocSGC{" +
            "id=" + getId() +
            ", idElemento=" + getIdElemento() +
            ", idDoc=" + getIdDoc() +
            ", valor='" + getValor() + "'" +
            "}";
    }
}
