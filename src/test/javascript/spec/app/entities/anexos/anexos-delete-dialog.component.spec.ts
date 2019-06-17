/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { AnexosDeleteDialogComponent } from 'app/entities/anexos/anexos-delete-dialog.component';
import { AnexosService } from 'app/entities/anexos/anexos.service';

describe('Component Tests', () => {
  describe('Anexos Management Delete Component', () => {
    let comp: AnexosDeleteDialogComponent;
    let fixture: ComponentFixture<AnexosDeleteDialogComponent>;
    let service: AnexosService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AnexosDeleteDialogComponent]
      })
        .overrideTemplate(AnexosDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnexosDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnexosService);
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
