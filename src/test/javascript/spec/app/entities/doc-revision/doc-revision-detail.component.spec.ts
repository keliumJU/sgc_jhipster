/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { DocRevisionDetailComponent } from 'app/entities/doc-revision/doc-revision-detail.component';
import { DocRevision } from 'app/shared/model/doc-revision.model';

describe('Component Tests', () => {
  describe('DocRevision Management Detail Component', () => {
    let comp: DocRevisionDetailComponent;
    let fixture: ComponentFixture<DocRevisionDetailComponent>;
    const route = ({ data: of({ docRevision: new DocRevision(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocRevisionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocRevisionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocRevisionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.docRevision).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
