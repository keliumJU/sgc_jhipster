import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SgcSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SgcSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [SgcSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SgcSharedModule {
  static forRoot() {
    return {
      ngModule: SgcSharedModule
    };
  }
}
