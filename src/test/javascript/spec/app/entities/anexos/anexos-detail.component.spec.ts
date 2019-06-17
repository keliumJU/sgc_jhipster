/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { AnexosDetailComponent } from 'app/entities/anexos/anexos-detail.component';
import { Anexos } from 'app/shared/model/anexos.model';

describe('Component Tests', () => {
  describe('Anexos Management Detail Component', () => {
    let comp: AnexosDetailComponent;
    let fixture: ComponentFixture<AnexosDetailComponent>;
    const route = ({ data: of({ anexos: new Anexos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AnexosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AnexosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnexosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.anexos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
