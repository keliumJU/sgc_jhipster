/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { SolRevisionUpdateComponent } from 'app/entities/sol-revision/sol-revision-update.component';
import { SolRevisionService } from 'app/entities/sol-revision/sol-revision.service';
import { SolRevision } from 'app/shared/model/sol-revision.model';

describe('Component Tests', () => {
  describe('SolRevision Management Update Component', () => {
    let comp: SolRevisionUpdateComponent;
    let fixture: ComponentFixture<SolRevisionUpdateComponent>;
    let service: SolRevisionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [SolRevisionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SolRevisionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolRevisionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SolRevisionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SolRevision(123);
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
        const entity = new SolRevision();
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
