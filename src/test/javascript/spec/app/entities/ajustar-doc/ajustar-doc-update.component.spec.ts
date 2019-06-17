/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { AjustarDocUpdateComponent } from 'app/entities/ajustar-doc/ajustar-doc-update.component';
import { AjustarDocService } from 'app/entities/ajustar-doc/ajustar-doc.service';
import { AjustarDoc } from 'app/shared/model/ajustar-doc.model';

describe('Component Tests', () => {
  describe('AjustarDoc Management Update Component', () => {
    let comp: AjustarDocUpdateComponent;
    let fixture: ComponentFixture<AjustarDocUpdateComponent>;
    let service: AjustarDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AjustarDocUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AjustarDocUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AjustarDocUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AjustarDocService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AjustarDoc(123);
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
        const entity = new AjustarDoc();
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
