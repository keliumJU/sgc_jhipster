/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { HistorialCambiosDetailComponent } from 'app/entities/historial-cambios/historial-cambios-detail.component';
import { HistorialCambios } from 'app/shared/model/historial-cambios.model';

describe('Component Tests', () => {
  describe('HistorialCambios Management Detail Component', () => {
    let comp: HistorialCambiosDetailComponent;
    let fixture: ComponentFixture<HistorialCambiosDetailComponent>;
    const route = ({ data: of({ historialCambios: new HistorialCambios(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [HistorialCambiosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistorialCambiosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorialCambiosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historialCambios).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
