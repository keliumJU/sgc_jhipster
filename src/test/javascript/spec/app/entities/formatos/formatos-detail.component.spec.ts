/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { FormatosDetailComponent } from 'app/entities/formatos/formatos-detail.component';
import { Formatos } from 'app/shared/model/formatos.model';

describe('Component Tests', () => {
  describe('Formatos Management Detail Component', () => {
    let comp: FormatosDetailComponent;
    let fixture: ComponentFixture<FormatosDetailComponent>;
    const route = ({ data: of({ formatos: new Formatos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [FormatosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FormatosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormatosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formatos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
