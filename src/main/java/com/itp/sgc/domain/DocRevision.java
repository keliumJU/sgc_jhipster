package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DocRevision.
 */
@Entity
@Table(name = "doc_revision")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DocRevision implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "id_user")
    private String idUser;

    @Column(name = "id_doc")
    private Integer idDoc;

    @Column(name = "comentario_1")
    private String comentario1;

    @Column(name = "comentario_2")
    private String comentario2;

    @ManyToOne
    @JsonIgnoreProperties("docRevisions")
    private DocumentoSGC documentoSGC;

    @ManyToOne
    @JsonIgnoreProperties("docRevisions")
    private User user;

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

    public DocRevision code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getIdUser() {
        return idUser;
    }

    public DocRevision idUser(String idUser) {
        this.idUser = idUser;
        return this;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public Integer getIdDoc() {
        return idDoc;
    }

    public DocRevision idDoc(Integer idDoc) {
        this.idDoc = idDoc;
        return this;
    }

    public void setIdDoc(Integer idDoc) {
        this.idDoc = idDoc;
    }

    public String getComentario1() {
        return comentario1;
    }

    public DocRevision comentario1(String comentario1) {
        this.comentario1 = comentario1;
        return this;
    }

    public void setComentario1(String comentario1) {
        this.comentario1 = comentario1;
    }

    public String getComentario2() {
        return comentario2;
    }

    public DocRevision comentario2(String comentario2) {
        this.comentario2 = comentario2;
        return this;
    }

    public void setComentario2(String comentario2) {
        this.comentario2 = comentario2;
    }

    public DocumentoSGC getDocumentoSGC() {
        return documentoSGC;
    }

    public DocRevision documentoSGC(DocumentoSGC documentoSGC) {
        this.documentoSGC = documentoSGC;
        return this;
    }

    public void setDocumentoSGC(DocumentoSGC documentoSGC) {
        this.documentoSGC = documentoSGC;
    }

    public User getUser() {
        return user;
    }

    public DocRevision user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocRevision)) {
            return false;
        }
        return id != null && id.equals(((DocRevision) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DocRevision{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", idUser='" + getIdUser() + "'" +
            ", idDoc=" + getIdDoc() +
            ", comentario1='" + getComentario1() + "'" +
            ", comentario2='" + getComentario2() + "'" +
            "}";
    }
}
