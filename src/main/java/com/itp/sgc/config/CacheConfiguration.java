package com.itp.sgc.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.itp.sgc.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.itp.sgc.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.itp.sgc.domain.User.class.getName());
            createCache(cm, com.itp.sgc.domain.Authority.class.getName());
            createCache(cm, com.itp.sgc.domain.User.class.getName() + ".authorities");
            createCache(cm, com.itp.sgc.domain.DocumentoSGC.class.getName());
            createCache(cm, com.itp.sgc.domain.TipoDoc.class.getName());
            createCache(cm, com.itp.sgc.domain.HistorialCambios.class.getName());
            createCache(cm, com.itp.sgc.domain.MacroProceso.class.getName());
            createCache(cm, com.itp.sgc.domain.Proceso.class.getName());
            createCache(cm, com.itp.sgc.domain.ElementosDocSGC.class.getName());
            createCache(cm, com.itp.sgc.domain.Elementos.class.getName());
            createCache(cm, com.itp.sgc.domain.Contenido.class.getName());
            createCache(cm, com.itp.sgc.domain.Anexos.class.getName());
            createCache(cm, com.itp.sgc.domain.DocRevision.class.getName());
            createCache(cm, com.itp.sgc.domain.EstadoDoc.class.getName());
            createCache(cm, com.itp.sgc.domain.Formatos.class.getName());
            createCache(cm, com.itp.sgc.domain.AjustarDoc.class.getName());
            createCache(cm, com.itp.sgc.domain.Cargo.class.getName());
            createCache(cm, com.itp.sgc.domain.AccionDoc.class.getName());
            createCache(cm, com.itp.sgc.domain.VersionFormatos.class.getName());
            createCache(cm, com.itp.sgc.domain.Solicitud.class.getName());
            createCache(cm, com.itp.sgc.domain.TipoSolicitud.class.getName());
            createCache(cm, com.itp.sgc.domain.SolRevision.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
