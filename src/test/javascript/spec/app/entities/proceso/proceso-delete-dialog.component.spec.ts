/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { ProcesoDeleteDialogComponent } from 'app/entities/proceso/proceso-delete-dialog.component';
import { ProcesoService } from 'app/entities/proceso/proceso.service';

describe('Component Tests', () => {
  describe('Proceso Management Delete Component', () => {
    let comp: ProcesoDeleteDialogComponent;
    let fixture: ComponentFixture<ProcesoDeleteDialogComponent>;
    let service: ProcesoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ProcesoDeleteDialogComponent]
      })
        .overrideTemplate(ProcesoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcesoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcesoService);
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
