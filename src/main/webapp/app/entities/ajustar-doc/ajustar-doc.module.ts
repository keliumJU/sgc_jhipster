import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  AjustarDocComponent,
  AjustarDocDetailComponent,
  AjustarDocUpdateComponent,
  AjustarDocDeletePopupComponent,
  AjustarDocDeleteDialogComponent,
  ajustarDocRoute,
  ajustarDocPopupRoute
} from './';

const ENTITY_STATES = [...ajustarDocRoute, ...ajustarDocPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AjustarDocComponent,
    AjustarDocDetailComponent,
    AjustarDocUpdateComponent,
    AjustarDocDeleteDialogComponent,
    AjustarDocDeletePopupComponent
  ],
  entryComponents: [AjustarDocComponent, AjustarDocUpdateComponent, AjustarDocDeleteDialogComponent, AjustarDocDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcAjustarDocModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
