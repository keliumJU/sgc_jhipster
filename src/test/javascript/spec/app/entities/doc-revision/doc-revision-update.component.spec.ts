/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { DocRevisionUpdateComponent } from 'app/entities/doc-revision/doc-revision-update.component';
import { DocRevisionService } from 'app/entities/doc-revision/doc-revision.service';
import { DocRevision } from 'app/shared/model/doc-revision.model';

describe('Component Tests', () => {
  describe('DocRevision Management Update Component', () => {
    let comp: DocRevisionUpdateComponent;
    let fixture: ComponentFixture<DocRevisionUpdateComponent>;
    let service: DocRevisionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocRevisionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DocRevisionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocRevisionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocRevisionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocRevision(123);
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
        const entity = new DocRevision();
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
