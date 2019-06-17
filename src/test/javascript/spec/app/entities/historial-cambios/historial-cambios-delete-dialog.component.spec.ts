/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { HistorialCambiosDeleteDialogComponent } from 'app/entities/historial-cambios/historial-cambios-delete-dialog.component';
import { HistorialCambiosService } from 'app/entities/historial-cambios/historial-cambios.service';

describe('Component Tests', () => {
  describe('HistorialCambios Management Delete Component', () => {
    let comp: HistorialCambiosDeleteDialogComponent;
    let fixture: ComponentFixture<HistorialCambiosDeleteDialogComponent>;
    let service: HistorialCambiosService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [HistorialCambiosDeleteDialogComponent]
      })
        .overrideTemplate(HistorialCambiosDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorialCambiosDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialCambiosService);
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
