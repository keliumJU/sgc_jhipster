/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { MacroProcesoComponent } from 'app/entities/macro-proceso/macro-proceso.component';
import { MacroProcesoService } from 'app/entities/macro-proceso/macro-proceso.service';
import { MacroProceso } from 'app/shared/model/macro-proceso.model';

describe('Component Tests', () => {
  describe('MacroProceso Management Component', () => {
    let comp: MacroProcesoComponent;
    let fixture: ComponentFixture<MacroProcesoComponent>;
    let service: MacroProcesoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [MacroProcesoComponent],
        providers: []
      })
        .overrideTemplate(MacroProcesoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MacroProcesoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MacroProcesoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MacroProceso(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.macroProcesos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
