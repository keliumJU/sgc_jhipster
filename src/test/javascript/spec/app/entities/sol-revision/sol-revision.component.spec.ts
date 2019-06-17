/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { SolRevisionComponent } from 'app/entities/sol-revision/sol-revision.component';
import { SolRevisionService } from 'app/entities/sol-revision/sol-revision.service';
import { SolRevision } from 'app/shared/model/sol-revision.model';

describe('Component Tests', () => {
  describe('SolRevision Management Component', () => {
    let comp: SolRevisionComponent;
    let fixture: ComponentFixture<SolRevisionComponent>;
    let service: SolRevisionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [SolRevisionComponent],
        providers: []
      })
        .overrideTemplate(SolRevisionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolRevisionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SolRevisionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SolRevision(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.solRevisions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
