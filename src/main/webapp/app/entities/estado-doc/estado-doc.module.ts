import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  EstadoDocComponent,
  EstadoDocDetailComponent,
  EstadoDocUpdateComponent,
  EstadoDocDeletePopupComponent,
  EstadoDocDeleteDialogComponent,
  estadoDocRoute,
  estadoDocPopupRoute
} from './';

const ENTITY_STATES = [...estadoDocRoute, ...estadoDocPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoDocComponent,
    EstadoDocDetailComponent,
    EstadoDocUpdateComponent,
    EstadoDocDeleteDialogComponent,
    EstadoDocDeletePopupComponent
  ],
  entryComponents: [EstadoDocComponent, EstadoDocUpdateComponent, EstadoDocDeleteDialogComponent, EstadoDocDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcEstadoDocModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
