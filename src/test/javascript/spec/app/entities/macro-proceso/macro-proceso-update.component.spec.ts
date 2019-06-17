/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { MacroProcesoUpdateComponent } from 'app/entities/macro-proceso/macro-proceso-update.component';
import { MacroProcesoService } from 'app/entities/macro-proceso/macro-proceso.service';
import { MacroProceso } from 'app/shared/model/macro-proceso.model';

describe('Component Tests', () => {
  describe('MacroProceso Management Update Component', () => {
    let comp: MacroProcesoUpdateComponent;
    let fixture: ComponentFixture<MacroProcesoUpdateComponent>;
    let service: MacroProcesoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [MacroProcesoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MacroProcesoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MacroProcesoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MacroProcesoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MacroProceso(123);
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
        const entity = new MacroProceso();
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
