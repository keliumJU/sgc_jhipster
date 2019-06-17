/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { SolRevisionDeleteDialogComponent } from 'app/entities/sol-revision/sol-revision-delete-dialog.component';
import { SolRevisionService } from 'app/entities/sol-revision/sol-revision.service';

describe('Component Tests', () => {
  describe('SolRevision Management Delete Component', () => {
    let comp: SolRevisionDeleteDialogComponent;
    let fixture: ComponentFixture<SolRevisionDeleteDialogComponent>;
    let service: SolRevisionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [SolRevisionDeleteDialogComponent]
      })
        .overrideTemplate(SolRevisionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SolRevisionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SolRevisionService);
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
