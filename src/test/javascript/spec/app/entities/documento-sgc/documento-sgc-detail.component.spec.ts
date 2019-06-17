/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { DocumentoSGCDetailComponent } from 'app/entities/documento-sgc/documento-sgc-detail.component';
import { DocumentoSGC } from 'app/shared/model/documento-sgc.model';

describe('Component Tests', () => {
  describe('DocumentoSGC Management Detail Component', () => {
    let comp: DocumentoSGCDetailComponent;
    let fixture: ComponentFixture<DocumentoSGCDetailComponent>;
    const route = ({ data: of({ documentoSGC: new DocumentoSGC(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocumentoSGCDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocumentoSGCDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentoSGCDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documentoSGC).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
