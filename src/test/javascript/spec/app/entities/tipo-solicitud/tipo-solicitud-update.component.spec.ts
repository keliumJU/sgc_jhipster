/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { TipoSolicitudUpdateComponent } from 'app/entities/tipo-solicitud/tipo-solicitud-update.component';
import { TipoSolicitudService } from 'app/entities/tipo-solicitud/tipo-solicitud.service';
import { TipoSolicitud } from 'app/shared/model/tipo-solicitud.model';

describe('Component Tests', () => {
  describe('TipoSolicitud Management Update Component', () => {
    let comp: TipoSolicitudUpdateComponent;
    let fixture: ComponentFixture<TipoSolicitudUpdateComponent>;
    let service: TipoSolicitudService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [TipoSolicitudUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoSolicitudUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSolicitudUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSolicitudService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoSolicitud(123);
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
        const entity = new TipoSolicitud();
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
