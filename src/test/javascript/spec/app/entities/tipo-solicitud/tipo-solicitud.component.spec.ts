/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { TipoSolicitudComponent } from 'app/entities/tipo-solicitud/tipo-solicitud.component';
import { TipoSolicitudService } from 'app/entities/tipo-solicitud/tipo-solicitud.service';
import { TipoSolicitud } from 'app/shared/model/tipo-solicitud.model';

describe('Component Tests', () => {
  describe('TipoSolicitud Management Component', () => {
    let comp: TipoSolicitudComponent;
    let fixture: ComponentFixture<TipoSolicitudComponent>;
    let service: TipoSolicitudService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [TipoSolicitudComponent],
        providers: []
      })
        .overrideTemplate(TipoSolicitudComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSolicitudComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSolicitudService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoSolicitud(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoSolicituds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
