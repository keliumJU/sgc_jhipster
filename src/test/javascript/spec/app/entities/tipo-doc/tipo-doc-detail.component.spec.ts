/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { TipoDocDetailComponent } from 'app/entities/tipo-doc/tipo-doc-detail.component';
import { TipoDoc } from 'app/shared/model/tipo-doc.model';

describe('Component Tests', () => {
  describe('TipoDoc Management Detail Component', () => {
    let comp: TipoDocDetailComponent;
    let fixture: ComponentFixture<TipoDocDetailComponent>;
    const route = ({ data: of({ tipoDoc: new TipoDoc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [TipoDocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoDocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoDocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoDoc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
