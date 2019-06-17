/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { MacroProcesoDetailComponent } from 'app/entities/macro-proceso/macro-proceso-detail.component';
import { MacroProceso } from 'app/shared/model/macro-proceso.model';

describe('Component Tests', () => {
  describe('MacroProceso Management Detail Component', () => {
    let comp: MacroProcesoDetailComponent;
    let fixture: ComponentFixture<MacroProcesoDetailComponent>;
    const route = ({ data: of({ macroProceso: new MacroProceso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [MacroProcesoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MacroProcesoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MacroProcesoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.macroProceso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
