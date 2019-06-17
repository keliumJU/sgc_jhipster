/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { EstadoDocUpdateComponent } from 'app/entities/estado-doc/estado-doc-update.component';
import { EstadoDocService } from 'app/entities/estado-doc/estado-doc.service';
import { EstadoDoc } from 'app/shared/model/estado-doc.model';

describe('Component Tests', () => {
  describe('EstadoDoc Management Update Component', () => {
    let comp: EstadoDocUpdateComponent;
    let fixture: ComponentFixture<EstadoDocUpdateComponent>;
    let service: EstadoDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [EstadoDocUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstadoDocUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoDocUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoDocService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoDoc(123);
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
        const entity = new EstadoDoc();
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
