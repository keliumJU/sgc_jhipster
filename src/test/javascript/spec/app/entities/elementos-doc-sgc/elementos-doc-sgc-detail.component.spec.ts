/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { ElementosDocSGCDetailComponent } from 'app/entities/elementos-doc-sgc/elementos-doc-sgc-detail.component';
import { ElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';

describe('Component Tests', () => {
  describe('ElementosDocSGC Management Detail Component', () => {
    let comp: ElementosDocSGCDetailComponent;
    let fixture: ComponentFixture<ElementosDocSGCDetailComponent>;
    const route = ({ data: of({ elementosDocSGC: new ElementosDocSGC(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ElementosDocSGCDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ElementosDocSGCDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ElementosDocSGCDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.elementosDocSGC).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
