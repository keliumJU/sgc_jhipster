/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { FormatosDeleteDialogComponent } from 'app/entities/formatos/formatos-delete-dialog.component';
import { FormatosService } from 'app/entities/formatos/formatos.service';

describe('Component Tests', () => {
  describe('Formatos Management Delete Component', () => {
    let comp: FormatosDeleteDialogComponent;
    let fixture: ComponentFixture<FormatosDeleteDialogComponent>;
    let service: FormatosService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [FormatosDeleteDialogComponent]
      })
        .overrideTemplate(FormatosDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormatosDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormatosService);
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
