/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { AccionDocDetailComponent } from 'app/entities/accion-doc/accion-doc-detail.component';
import { AccionDoc } from 'app/shared/model/accion-doc.model';

describe('Component Tests', () => {
  describe('AccionDoc Management Detail Component', () => {
    let comp: AccionDocDetailComponent;
    let fixture: ComponentFixture<AccionDocDetailComponent>;
    const route = ({ data: of({ accionDoc: new AccionDoc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AccionDocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AccionDocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AccionDocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.accionDoc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
