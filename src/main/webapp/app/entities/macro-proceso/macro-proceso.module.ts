import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  MacroProcesoComponent,
  MacroProcesoDetailComponent,
  MacroProcesoUpdateComponent,
  MacroProcesoDeletePopupComponent,
  MacroProcesoDeleteDialogComponent,
  macroProcesoRoute,
  macroProcesoPopupRoute
} from './';

const ENTITY_STATES = [...macroProcesoRoute, ...macroProcesoPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MacroProcesoComponent,
    MacroProcesoDetailComponent,
    MacroProcesoUpdateComponent,
    MacroProcesoDeleteDialogComponent,
    MacroProcesoDeletePopupComponent
  ],
  entryComponents: [
    MacroProcesoComponent,
    MacroProcesoUpdateComponent,
    MacroProcesoDeleteDialogComponent,
    MacroProcesoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcMacroProcesoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
