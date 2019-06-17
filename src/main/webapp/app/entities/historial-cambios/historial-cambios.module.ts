import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  HistorialCambiosComponent,
  HistorialCambiosDetailComponent,
  HistorialCambiosUpdateComponent,
  HistorialCambiosDeletePopupComponent,
  HistorialCambiosDeleteDialogComponent,
  historialCambiosRoute,
  historialCambiosPopupRoute
} from './';

const ENTITY_STATES = [...historialCambiosRoute, ...historialCambiosPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HistorialCambiosComponent,
    HistorialCambiosDetailComponent,
    HistorialCambiosUpdateComponent,
    HistorialCambiosDeleteDialogComponent,
    HistorialCambiosDeletePopupComponent
  ],
  entryComponents: [
    HistorialCambiosComponent,
    HistorialCambiosUpdateComponent,
    HistorialCambiosDeleteDialogComponent,
    HistorialCambiosDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcHistorialCambiosModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
