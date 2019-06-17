import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  FormatosComponent,
  FormatosDetailComponent,
  FormatosUpdateComponent,
  FormatosDeletePopupComponent,
  FormatosDeleteDialogComponent,
  formatosRoute,
  formatosPopupRoute
} from './';

const ENTITY_STATES = [...formatosRoute, ...formatosPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FormatosComponent,
    FormatosDetailComponent,
    FormatosUpdateComponent,
    FormatosDeleteDialogComponent,
    FormatosDeletePopupComponent
  ],
  entryComponents: [FormatosComponent, FormatosUpdateComponent, FormatosDeleteDialogComponent, FormatosDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcFormatosModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
