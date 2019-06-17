package com.itp.sgc.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TipoDoc.
 */
@Entity
@Table(name = "tipo_doc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoDoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "tipo_doc")
    private String tipoDoc;

    @Column(name = "cod_tip")
    private String codTip;

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

    public TipoDoc code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getTipoDoc() {
        return tipoDoc;
    }

    public TipoDoc tipoDoc(String tipoDoc) {
        this.tipoDoc = tipoDoc;
        return this;
    }

    public void setTipoDoc(String tipoDoc) {
        this.tipoDoc = tipoDoc;
    }

    public String getCodTip() {
        return codTip;
    }

    public TipoDoc codTip(String codTip) {
        this.codTip = codTip;
        return this;
    }

    public void setCodTip(String codTip) {
        this.codTip = codTip;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoDoc)) {
            return false;
        }
        return id != null && id.equals(((TipoDoc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoDoc{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", tipoDoc='" + getTipoDoc() + "'" +
            ", codTip='" + getCodTip() + "'" +
            "}";
    }
}
