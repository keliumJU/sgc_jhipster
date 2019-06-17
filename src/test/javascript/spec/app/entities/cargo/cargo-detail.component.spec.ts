/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { CargoDetailComponent } from 'app/entities/cargo/cargo-detail.component';
import { Cargo } from 'app/shared/model/cargo.model';

describe('Component Tests', () => {
  describe('Cargo Management Detail Component', () => {
    let comp: CargoDetailComponent;
    let fixture: ComponentFixture<CargoDetailComponent>;
    const route = ({ data: of({ cargo: new Cargo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [CargoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CargoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CargoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cargo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
