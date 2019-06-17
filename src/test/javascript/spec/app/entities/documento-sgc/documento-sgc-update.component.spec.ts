/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { DocumentoSGCUpdateComponent } from 'app/entities/documento-sgc/documento-sgc-update.component';
import { DocumentoSGCService } from 'app/entities/documento-sgc/documento-sgc.service';
import { DocumentoSGC } from 'app/shared/model/documento-sgc.model';

describe('Component Tests', () => {
  describe('DocumentoSGC Management Update Component', () => {
    let comp: DocumentoSGCUpdateComponent;
    let fixture: ComponentFixture<DocumentoSGCUpdateComponent>;
    let service: DocumentoSGCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocumentoSGCUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DocumentoSGCUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentoSGCUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentoSGCService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentoSGC(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentoSGC();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
