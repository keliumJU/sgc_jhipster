import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SgcSharedModule } from 'app/shared';
import {
  CargoComponent,
  CargoDetailComponent,
  CargoUpdateComponent,
  CargoDeletePopupComponent,
  CargoDeleteDialogComponent,
  cargoRoute,
  cargoPopupRoute
} from './';

const ENTITY_STATES = [...cargoRoute, ...cargoPopupRoute];

@NgModule({
  imports: [SgcSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CargoComponent, CargoDetailComponent, CargoUpdateComponent, CargoDeleteDialogComponent, CargoDeletePopupComponent],
  entryComponents: [CargoComponent, CargoUpdateComponent, CargoDeleteDialogComponent, CargoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcCargoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
