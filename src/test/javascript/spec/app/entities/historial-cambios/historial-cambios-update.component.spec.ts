/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { HistorialCambiosUpdateComponent } from 'app/entities/historial-cambios/historial-cambios-update.component';
import { HistorialCambiosService } from 'app/entities/historial-cambios/historial-cambios.service';
import { HistorialCambios } from 'app/shared/model/historial-cambios.model';

describe('Component Tests', () => {
  describe('HistorialCambios Management Update Component', () => {
    let comp: HistorialCambiosUpdateComponent;
    let fixture: ComponentFixture<HistorialCambiosUpdateComponent>;
    let service: HistorialCambiosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [HistorialCambiosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistorialCambiosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorialCambiosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialCambiosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistorialCambios(123);
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
        const entity = new HistorialCambios();
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
