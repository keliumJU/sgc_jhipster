package com.itp.sgc.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A MacroProceso.
 */
@Entity
@Table(name = "macro_proceso")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MacroProceso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "macro_proceso")
    private String macroProceso;

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

    public MacroProceso code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMacroProceso() {
        return macroProceso;
    }

    public MacroProceso macroProceso(String macroProceso) {
        this.macroProceso = macroProceso;
        return this;
    }

    public void setMacroProceso(String macroProceso) {
        this.macroProceso = macroProceso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MacroProceso)) {
            return false;
        }
        return id != null && id.equals(((MacroProceso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MacroProceso{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", macroProceso='" + getMacroProceso() + "'" +
            "}";
    }
}
