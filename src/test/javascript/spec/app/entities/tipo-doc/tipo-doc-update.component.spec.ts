/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { TipoDocUpdateComponent } from 'app/entities/tipo-doc/tipo-doc-update.component';
import { TipoDocService } from 'app/entities/tipo-doc/tipo-doc.service';
import { TipoDoc } from 'app/shared/model/tipo-doc.model';

describe('Component Tests', () => {
  describe('TipoDoc Management Update Component', () => {
    let comp: TipoDocUpdateComponent;
    let fixture: ComponentFixture<TipoDocUpdateComponent>;
    let service: TipoDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [TipoDocUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoDocUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDocUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDocService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoDoc(123);
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
        const entity = new TipoDoc();
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
