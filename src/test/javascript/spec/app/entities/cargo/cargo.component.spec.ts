/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { CargoComponent } from 'app/entities/cargo/cargo.component';
import { CargoService } from 'app/entities/cargo/cargo.service';
import { Cargo } from 'app/shared/model/cargo.model';

describe('Component Tests', () => {
  describe('Cargo Management Component', () => {
    let comp: CargoComponent;
    let fixture: ComponentFixture<CargoComponent>;
    let service: CargoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [CargoComponent],
        providers: []
      })
        .overrideTemplate(CargoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CargoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CargoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cargo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cargos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
