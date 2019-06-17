/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { DocumentoSGCDeleteDialogComponent } from 'app/entities/documento-sgc/documento-sgc-delete-dialog.component';
import { DocumentoSGCService } from 'app/entities/documento-sgc/documento-sgc.service';

describe('Component Tests', () => {
  describe('DocumentoSGC Management Delete Component', () => {
    let comp: DocumentoSGCDeleteDialogComponent;
    let fixture: ComponentFixture<DocumentoSGCDeleteDialogComponent>;
    let service: DocumentoSGCService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocumentoSGCDeleteDialogComponent]
      })
        .overrideTemplate(DocumentoSGCDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentoSGCDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentoSGCService);
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
