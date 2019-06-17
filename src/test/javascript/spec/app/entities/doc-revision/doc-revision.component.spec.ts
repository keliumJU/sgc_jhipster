/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { DocRevisionComponent } from 'app/entities/doc-revision/doc-revision.component';
import { DocRevisionService } from 'app/entities/doc-revision/doc-revision.service';
import { DocRevision } from 'app/shared/model/doc-revision.model';

describe('Component Tests', () => {
  describe('DocRevision Management Component', () => {
    let comp: DocRevisionComponent;
    let fixture: ComponentFixture<DocRevisionComponent>;
    let service: DocRevisionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocRevisionComponent],
        providers: []
      })
        .overrideTemplate(DocRevisionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocRevisionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocRevisionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocRevision(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.docRevisions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
