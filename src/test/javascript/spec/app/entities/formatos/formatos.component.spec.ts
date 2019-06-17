/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { FormatosComponent } from 'app/entities/formatos/formatos.component';
import { FormatosService } from 'app/entities/formatos/formatos.service';
import { Formatos } from 'app/shared/model/formatos.model';

describe('Component Tests', () => {
  describe('Formatos Management Component', () => {
    let comp: FormatosComponent;
    let fixture: ComponentFixture<FormatosComponent>;
    let service: FormatosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [FormatosComponent],
        providers: []
      })
        .overrideTemplate(FormatosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormatosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormatosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Formatos(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formatos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
