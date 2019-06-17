/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { DocumentoSGCComponent } from 'app/entities/documento-sgc/documento-sgc.component';
import { DocumentoSGCService } from 'app/entities/documento-sgc/documento-sgc.service';
import { DocumentoSGC } from 'app/shared/model/documento-sgc.model';

describe('Component Tests', () => {
  describe('DocumentoSGC Management Component', () => {
    let comp: DocumentoSGCComponent;
    let fixture: ComponentFixture<DocumentoSGCComponent>;
    let service: DocumentoSGCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocumentoSGCComponent],
        providers: []
      })
        .overrideTemplate(DocumentoSGCComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentoSGCComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentoSGCService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocumentoSGC(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documentoSGCS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
