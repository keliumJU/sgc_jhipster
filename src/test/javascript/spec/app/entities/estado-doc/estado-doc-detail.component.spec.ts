/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { EstadoDocDetailComponent } from 'app/entities/estado-doc/estado-doc-detail.component';
import { EstadoDoc } from 'app/shared/model/estado-doc.model';

describe('Component Tests', () => {
  describe('EstadoDoc Management Detail Component', () => {
    let comp: EstadoDocDetailComponent;
    let fixture: ComponentFixture<EstadoDocDetailComponent>;
    const route = ({ data: of({ estadoDoc: new EstadoDoc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [EstadoDocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoDocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoDocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoDoc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
