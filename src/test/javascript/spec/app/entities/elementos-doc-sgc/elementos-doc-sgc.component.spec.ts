/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { ElementosDocSGCComponent } from 'app/entities/elementos-doc-sgc/elementos-doc-sgc.component';
import { ElementosDocSGCService } from 'app/entities/elementos-doc-sgc/elementos-doc-sgc.service';
import { ElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';

describe('Component Tests', () => {
  describe('ElementosDocSGC Management Component', () => {
    let comp: ElementosDocSGCComponent;
    let fixture: ComponentFixture<ElementosDocSGCComponent>;
    let service: ElementosDocSGCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ElementosDocSGCComponent],
        providers: []
      })
        .overrideTemplate(ElementosDocSGCComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ElementosDocSGCComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ElementosDocSGCService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ElementosDocSGC(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.elementosDocSGCS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
