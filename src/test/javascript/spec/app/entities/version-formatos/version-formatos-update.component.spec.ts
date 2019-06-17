/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { VersionFormatosUpdateComponent } from 'app/entities/version-formatos/version-formatos-update.component';
import { VersionFormatosService } from 'app/entities/version-formatos/version-formatos.service';
import { VersionFormatos } from 'app/shared/model/version-formatos.model';

describe('Component Tests', () => {
  describe('VersionFormatos Management Update Component', () => {
    let comp: VersionFormatosUpdateComponent;
    let fixture: ComponentFixture<VersionFormatosUpdateComponent>;
    let service: VersionFormatosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [VersionFormatosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VersionFormatosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VersionFormatosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VersionFormatosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VersionFormatos(123);
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
        const entity = new VersionFormatos();
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
