import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  DocumentoSGCComponent,
  DocumentoSGCDetailComponent,
  DocumentoSGCUpdateComponent,
  DocumentoSGCDeletePopupComponent,
  DocumentoSGCDeleteDialogComponent,
  documentoSGCRoute,
  documentoSGCPopupRoute
} from './';

const ENTITY_STATES = [...documentoSGCRoute, ...documentoSGCPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DocumentoSGCComponent,
    DocumentoSGCDetailComponent,
    DocumentoSGCUpdateComponent,
    DocumentoSGCDeleteDialogComponent,
    DocumentoSGCDeletePopupComponent
  ],
  entryComponents: [
    DocumentoSGCComponent,
    DocumentoSGCUpdateComponent,
    DocumentoSGCDeleteDialogComponent,
    DocumentoSGCDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcDocumentoSGCModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
