package com.itp.sgc.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A VersionFormatos.
 */
@Entity
@Table(name = "version_formatos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class VersionFormatos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "id_formato")
    private Integer idFormato;

    @Lob
    @Column(name = "ruta_formato")
    private byte[] rutaFormato;

    @Column(name = "ruta_formato_content_type")
    private String rutaFormatoContentType;

    @Column(name = "nom_formato")
    private String nomFormato;

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

    public VersionFormatos code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getIdFormato() {
        return idFormato;
    }

    public VersionFormatos idFormato(Integer idFormato) {
        this.idFormato = idFormato;
        return this;
    }

    public void setIdFormato(Integer idFormato) {
        this.idFormato = idFormato;
    }

    public byte[] getRutaFormato() {
        return rutaFormato;
    }

    public VersionFormatos rutaFormato(byte[] rutaFormato) {
        this.rutaFormato = rutaFormato;
        return this;
    }

    public void setRutaFormato(byte[] rutaFormato) {
        this.rutaFormato = rutaFormato;
    }

    public String getRutaFormatoContentType() {
        return rutaFormatoContentType;
    }

    public VersionFormatos rutaFormatoContentType(String rutaFormatoContentType) {
        this.rutaFormatoContentType = rutaFormatoContentType;
        return this;
    }

    public void setRutaFormatoContentType(String rutaFormatoContentType) {
        this.rutaFormatoContentType = rutaFormatoContentType;
    }

    public String getNomFormato() {
        return nomFormato;
    }

    public VersionFormatos nomFormato(String nomFormato) {
        this.nomFormato = nomFormato;
        return this;
    }

    public void setNomFormato(String nomFormato) {
        this.nomFormato = nomFormato;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VersionFormatos)) {
            return false;
        }
        return id != null && id.equals(((VersionFormatos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "VersionFormatos{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", idFormato=" + getIdFormato() +
            ", rutaFormato='" + getRutaFormato() + "'" +
            ", rutaFormatoContentType='" + getRutaFormatoContentType() + "'" +
            ", nomFormato='" + getNomFormato() + "'" +
            "}";
    }
}
