/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { AccionDocUpdateComponent } from 'app/entities/accion-doc/accion-doc-update.component';
import { AccionDocService } from 'app/entities/accion-doc/accion-doc.service';
import { AccionDoc } from 'app/shared/model/accion-doc.model';

describe('Component Tests', () => {
  describe('AccionDoc Management Update Component', () => {
    let comp: AccionDocUpdateComponent;
    let fixture: ComponentFixture<AccionDocUpdateComponent>;
    let service: AccionDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AccionDocUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AccionDocUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AccionDocUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AccionDocService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AccionDoc(123);
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
        const entity = new AccionDoc();
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
