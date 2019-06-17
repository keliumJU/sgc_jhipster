/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { AnexosComponent } from 'app/entities/anexos/anexos.component';
import { AnexosService } from 'app/entities/anexos/anexos.service';
import { Anexos } from 'app/shared/model/anexos.model';

describe('Component Tests', () => {
  describe('Anexos Management Component', () => {
    let comp: AnexosComponent;
    let fixture: ComponentFixture<AnexosComponent>;
    let service: AnexosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AnexosComponent],
        providers: []
      })
        .overrideTemplate(AnexosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnexosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnexosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Anexos(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.anexos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
