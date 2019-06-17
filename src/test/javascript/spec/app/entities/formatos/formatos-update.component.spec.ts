/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { FormatosUpdateComponent } from 'app/entities/formatos/formatos-update.component';
import { FormatosService } from 'app/entities/formatos/formatos.service';
import { Formatos } from 'app/shared/model/formatos.model';

describe('Component Tests', () => {
  describe('Formatos Management Update Component', () => {
    let comp: FormatosUpdateComponent;
    let fixture: ComponentFixture<FormatosUpdateComponent>;
    let service: FormatosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [FormatosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FormatosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormatosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormatosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Formatos(123);
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
        const entity = new Formatos();
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
