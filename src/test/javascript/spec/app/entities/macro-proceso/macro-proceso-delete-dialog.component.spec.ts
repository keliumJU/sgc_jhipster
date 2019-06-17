/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { MacroProcesoDeleteDialogComponent } from 'app/entities/macro-proceso/macro-proceso-delete-dialog.component';
import { MacroProcesoService } from 'app/entities/macro-proceso/macro-proceso.service';

describe('Component Tests', () => {
  describe('MacroProceso Management Delete Component', () => {
    let comp: MacroProcesoDeleteDialogComponent;
    let fixture: ComponentFixture<MacroProcesoDeleteDialogComponent>;
    let service: MacroProcesoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [MacroProcesoDeleteDialogComponent]
      })
        .overrideTemplate(MacroProcesoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MacroProcesoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MacroProcesoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
