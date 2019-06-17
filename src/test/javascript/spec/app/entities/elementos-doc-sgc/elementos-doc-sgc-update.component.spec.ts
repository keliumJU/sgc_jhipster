/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { ElementosDocSGCUpdateComponent } from 'app/entities/elementos-doc-sgc/elementos-doc-sgc-update.component';
import { ElementosDocSGCService } from 'app/entities/elementos-doc-sgc/elementos-doc-sgc.service';
import { ElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';

describe('Component Tests', () => {
  describe('ElementosDocSGC Management Update Component', () => {
    let comp: ElementosDocSGCUpdateComponent;
    let fixture: ComponentFixture<ElementosDocSGCUpdateComponent>;
    let service: ElementosDocSGCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ElementosDocSGCUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ElementosDocSGCUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ElementosDocSGCUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ElementosDocSGCService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ElementosDocSGC(123);
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
        const entity = new ElementosDocSGC();
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
