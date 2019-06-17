import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  VersionFormatosComponent,
  VersionFormatosDetailComponent,
  VersionFormatosUpdateComponent,
  VersionFormatosDeletePopupComponent,
  VersionFormatosDeleteDialogComponent,
  versionFormatosRoute,
  versionFormatosPopupRoute
} from './';

const ENTITY_STATES = [...versionFormatosRoute, ...versionFormatosPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VersionFormatosComponent,
    VersionFormatosDetailComponent,
    VersionFormatosUpdateComponent,
    VersionFormatosDeleteDialogComponent,
    VersionFormatosDeletePopupComponent
  ],
  entryComponents: [
    VersionFormatosComponent,
    VersionFormatosUpdateComponent,
    VersionFormatosDeleteDialogComponent,
    VersionFormatosDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcVersionFormatosModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
