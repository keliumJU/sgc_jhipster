import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  TipoDocComponent,
  TipoDocDetailComponent,
  TipoDocUpdateComponent,
  TipoDocDeletePopupComponent,
  TipoDocDeleteDialogComponent,
  tipoDocRoute,
  tipoDocPopupRoute
} from './';

const ENTITY_STATES = [...tipoDocRoute, ...tipoDocPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoDocComponent,
    TipoDocDetailComponent,
    TipoDocUpdateComponent,
    TipoDocDeleteDialogComponent,
    TipoDocDeletePopupComponent
  ],
  entryComponents: [TipoDocComponent, TipoDocUpdateComponent, TipoDocDeleteDialogComponent, TipoDocDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcTipoDocModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
