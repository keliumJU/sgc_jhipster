/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { ProcesoUpdateComponent } from 'app/entities/proceso/proceso-update.component';
import { ProcesoService } from 'app/entities/proceso/proceso.service';
import { Proceso } from 'app/shared/model/proceso.model';

describe('Component Tests', () => {
  describe('Proceso Management Update Component', () => {
    let comp: ProcesoUpdateComponent;
    let fixture: ComponentFixture<ProcesoUpdateComponent>;
    let service: ProcesoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ProcesoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProcesoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcesoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcesoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Proceso(123);
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
        const entity = new Proceso();
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
