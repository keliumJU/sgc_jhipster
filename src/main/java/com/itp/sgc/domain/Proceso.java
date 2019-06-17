package com.itp.sgc.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Proceso.
 */
@Entity
@Table(name = "proceso")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Proceso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "proceso")
    private String proceso;

    @Column(name = "id_macro_proceso")
    private Integer idMacroProceso;

    @Column(name = "cod_doc")
    private String codDoc;

    @ManyToOne
    @JsonIgnoreProperties("procesos")
    private MacroProceso macroProceso;

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

    public Proceso code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getProceso() {
        return proceso;
    }

    public Proceso proceso(String proceso) {
        this.proceso = proceso;
        return this;
    }

    public void setProceso(String proceso) {
        this.proceso = proceso;
    }

    public Integer getIdMacroProceso() {
        return idMacroProceso;
    }

    public Proceso idMacroProceso(Integer idMacroProceso) {
        this.idMacroProceso = idMacroProceso;
        return this;
    }

    public void setIdMacroProceso(Integer idMacroProceso) {
        this.idMacroProceso = idMacroProceso;
    }

    public String getCodDoc() {
        return codDoc;
    }

    public Proceso codDoc(String codDoc) {
        this.codDoc = codDoc;
        return this;
    }

    public void setCodDoc(String codDoc) {
        this.codDoc = codDoc;
    }

    public MacroProceso getMacroProceso() {
        return macroProceso;
    }

    public Proceso macroProceso(MacroProceso macroProceso) {
        this.macroProceso = macroProceso;
        return this;
    }

    public void setMacroProceso(MacroProceso macroProceso) {
        this.macroProceso = macroProceso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proceso)) {
            return false;
        }
        return id != null && id.equals(((Proceso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Proceso{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", proceso='" + getProceso() + "'" +
            ", idMacroProceso=" + getIdMacroProceso() +
            ", codDoc='" + getCodDoc() + "'" +
            "}";
    }
}
