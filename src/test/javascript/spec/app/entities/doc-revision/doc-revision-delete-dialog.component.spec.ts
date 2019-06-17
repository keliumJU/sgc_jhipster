/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { DocRevisionDeleteDialogComponent } from 'app/entities/doc-revision/doc-revision-delete-dialog.component';
import { DocRevisionService } from 'app/entities/doc-revision/doc-revision.service';

describe('Component Tests', () => {
  describe('DocRevision Management Delete Component', () => {
    let comp: DocRevisionDeleteDialogComponent;
    let fixture: ComponentFixture<DocRevisionDeleteDialogComponent>;
    let service: DocRevisionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [DocRevisionDeleteDialogComponent]
      })
        .overrideTemplate(DocRevisionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocRevisionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocRevisionService);
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
