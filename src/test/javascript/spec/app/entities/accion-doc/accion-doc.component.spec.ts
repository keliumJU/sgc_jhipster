/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { AccionDocComponent } from 'app/entities/accion-doc/accion-doc.component';
import { AccionDocService } from 'app/entities/accion-doc/accion-doc.service';
import { AccionDoc } from 'app/shared/model/accion-doc.model';

describe('Component Tests', () => {
  describe('AccionDoc Management Component', () => {
    let comp: AccionDocComponent;
    let fixture: ComponentFixture<AccionDocComponent>;
    let service: AccionDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AccionDocComponent],
        providers: []
      })
        .overrideTemplate(AccionDocComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AccionDocComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AccionDocService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AccionDoc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.accionDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
