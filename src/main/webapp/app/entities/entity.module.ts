import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'documento-sgc',
        loadChildren: './documento-sgc/documento-sgc.module#SgcDocumentoSGCModule'
      },
      {
        path: 'tipo-doc',
        loadChildren: './tipo-doc/tipo-doc.module#SgcTipoDocModule'
      },
      {
        path: 'historial-cambios',
        loadChildren: './historial-cambios/historial-cambios.module#SgcHistorialCambiosModule'
      },
      {
        path: 'macro-proceso',
        loadChildren: './macro-proceso/macro-proceso.module#SgcMacroProcesoModule'
      },
      {
        path: 'proceso',
        loadChildren: './proceso/proceso.module#SgcProcesoModule'
      },
      {
        path: 'elementos-doc-sgc',
        loadChildren: './elementos-doc-sgc/elementos-doc-sgc.module#SgcElementosDocSGCModule'
      },
      {
        path: 'elementos',
        loadChildren: './elementos/elementos.module#SgcElementosModule'
      },
      {
        path: 'contenido',
        loadChildren: './contenido/contenido.module#SgcContenidoModule'
      },
      {
        path: 'anexos',
        loadChildren: './anexos/anexos.module#SgcAnexosModule'
      },
      {
        path: 'doc-revision',
        loadChildren: './doc-revision/doc-revision.module#SgcDocRevisionModule'
      },
      {
        path: 'estado-doc',
        loadChildren: './estado-doc/estado-doc.module#SgcEstadoDocModule'
      },
      {
        path: 'formatos',
        loadChildren: './formatos/formatos.module#SgcFormatosModule'
      },
      {
        path: 'ajustar-doc',
        loadChildren: './ajustar-doc/ajustar-doc.module#SgcAjustarDocModule'
      },
      {
        path: 'cargo',
        loadChildren: './cargo/cargo.module#SgcCargoModule'
      },
      {
        path: 'accion-doc',
        loadChildren: './accion-doc/accion-doc.module#SgcAccionDocModule'
      },
      {
        path: 'version-formatos',
        loadChildren: './version-formatos/version-formatos.module#SgcVersionFormatosModule'
      },
      {
        path: 'solicitud',
        loadChildren: './solicitud/solicitud.module#SgcSolicitudModule'
      },
      {
        path: 'tipo-solicitud',
        loadChildren: './tipo-solicitud/tipo-solicitud.module#SgcTipoSolicitudModule'
      },
      {
        path: 'sol-revision',
        loadChildren: './sol-revision/sol-revision.module#SgcSolRevisionModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcEntityModule {}
