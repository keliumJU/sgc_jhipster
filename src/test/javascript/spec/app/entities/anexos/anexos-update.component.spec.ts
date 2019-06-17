/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { AnexosUpdateComponent } from 'app/entities/anexos/anexos-update.component';
import { AnexosService } from 'app/entities/anexos/anexos.service';
import { Anexos } from 'app/shared/model/anexos.model';

describe('Component Tests', () => {
  describe('Anexos Management Update Component', () => {
    let comp: AnexosUpdateComponent;
    let fixture: ComponentFixture<AnexosUpdateComponent>;
    let service: AnexosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AnexosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AnexosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnexosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnexosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Anexos(123);
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
        const entity = new Anexos();
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
