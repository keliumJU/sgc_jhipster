/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { HistorialCambiosComponent } from 'app/entities/historial-cambios/historial-cambios.component';
import { HistorialCambiosService } from 'app/entities/historial-cambios/historial-cambios.service';
import { HistorialCambios } from 'app/shared/model/historial-cambios.model';

describe('Component Tests', () => {
  describe('HistorialCambios Management Component', () => {
    let comp: HistorialCambiosComponent;
    let fixture: ComponentFixture<HistorialCambiosComponent>;
    let service: HistorialCambiosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [HistorialCambiosComponent],
        providers: []
      })
        .overrideTemplate(HistorialCambiosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorialCambiosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialCambiosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HistorialCambios(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.historialCambios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
