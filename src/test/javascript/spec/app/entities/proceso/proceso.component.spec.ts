/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { ProcesoComponent } from 'app/entities/proceso/proceso.component';
import { ProcesoService } from 'app/entities/proceso/proceso.service';
import { Proceso } from 'app/shared/model/proceso.model';

describe('Component Tests', () => {
  describe('Proceso Management Component', () => {
    let comp: ProcesoComponent;
    let fixture: ComponentFixture<ProcesoComponent>;
    let service: ProcesoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ProcesoComponent],
        providers: []
      })
        .overrideTemplate(ProcesoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcesoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcesoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Proceso(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.procesos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
