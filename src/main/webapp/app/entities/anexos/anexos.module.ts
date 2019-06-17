import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  AnexosComponent,
  AnexosDetailComponent,
  AnexosUpdateComponent,
  AnexosDeletePopupComponent,
  AnexosDeleteDialogComponent,
  anexosRoute,
  anexosPopupRoute
} from './';

const ENTITY_STATES = [...anexosRoute, ...anexosPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AnexosComponent, AnexosDetailComponent, AnexosUpdateComponent, AnexosDeleteDialogComponent, AnexosDeletePopupComponent],
  entryComponents: [AnexosComponent, AnexosUpdateComponent, AnexosDeleteDialogComponent, AnexosDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcAnexosModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
