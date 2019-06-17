/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { AjustarDocDetailComponent } from 'app/entities/ajustar-doc/ajustar-doc-detail.component';
import { AjustarDoc } from 'app/shared/model/ajustar-doc.model';

describe('Component Tests', () => {
  describe('AjustarDoc Management Detail Component', () => {
    let comp: AjustarDocDetailComponent;
    let fixture: ComponentFixture<AjustarDocDetailComponent>;
    const route = ({ data: of({ ajustarDoc: new AjustarDoc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AjustarDocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AjustarDocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AjustarDocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ajustarDoc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
