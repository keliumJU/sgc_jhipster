/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { TipoSolicitudDetailComponent } from 'app/entities/tipo-solicitud/tipo-solicitud-detail.component';
import { TipoSolicitud } from 'app/shared/model/tipo-solicitud.model';

describe('Component Tests', () => {
  describe('TipoSolicitud Management Detail Component', () => {
    let comp: TipoSolicitudDetailComponent;
    let fixture: ComponentFixture<TipoSolicitudDetailComponent>;
    const route = ({ data: of({ tipoSolicitud: new TipoSolicitud(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [TipoSolicitudDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoSolicitudDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoSolicitudDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoSolicitud).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
