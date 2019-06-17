/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { ContenidoUpdateComponent } from 'app/entities/contenido/contenido-update.component';
import { ContenidoService } from 'app/entities/contenido/contenido.service';
import { Contenido } from 'app/shared/model/contenido.model';

describe('Component Tests', () => {
  describe('Contenido Management Update Component', () => {
    let comp: ContenidoUpdateComponent;
    let fixture: ComponentFixture<ContenidoUpdateComponent>;
    let service: ContenidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ContenidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContenidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContenidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContenidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Contenido(123);
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
        const entity = new Contenido();
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
