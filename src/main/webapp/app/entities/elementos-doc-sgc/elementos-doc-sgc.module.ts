import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  ElementosDocSGCComponent,
  ElementosDocSGCDetailComponent,
  ElementosDocSGCUpdateComponent,
  ElementosDocSGCDeletePopupComponent,
  ElementosDocSGCDeleteDialogComponent,
  elementosDocSGCRoute,
  elementosDocSGCPopupRoute
} from './';

const ENTITY_STATES = [...elementosDocSGCRoute, ...elementosDocSGCPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ElementosDocSGCComponent,
    ElementosDocSGCDetailComponent,
    ElementosDocSGCUpdateComponent,
    ElementosDocSGCDeleteDialogComponent,
    ElementosDocSGCDeletePopupComponent
  ],
  entryComponents: [
    ElementosDocSGCComponent,
    ElementosDocSGCUpdateComponent,
    ElementosDocSGCDeleteDialogComponent,
    ElementosDocSGCDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcElementosDocSGCModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
