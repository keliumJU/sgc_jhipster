/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { SolRevisionDetailComponent } from 'app/entities/sol-revision/sol-revision-detail.component';
import { SolRevision } from 'app/shared/model/sol-revision.model';

describe('Component Tests', () => {
  describe('SolRevision Management Detail Component', () => {
    let comp: SolRevisionDetailComponent;
    let fixture: ComponentFixture<SolRevisionDetailComponent>;
    const route = ({ data: of({ solRevision: new SolRevision(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [SolRevisionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SolRevisionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SolRevisionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.solRevision).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
