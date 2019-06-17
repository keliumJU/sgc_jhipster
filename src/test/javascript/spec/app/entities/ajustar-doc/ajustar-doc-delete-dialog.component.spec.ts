/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { AjustarDocDeleteDialogComponent } from 'app/entities/ajustar-doc/ajustar-doc-delete-dialog.component';
import { AjustarDocService } from 'app/entities/ajustar-doc/ajustar-doc.service';

describe('Component Tests', () => {
  describe('AjustarDoc Management Delete Component', () => {
    let comp: AjustarDocDeleteDialogComponent;
    let fixture: ComponentFixture<AjustarDocDeleteDialogComponent>;
    let service: AjustarDocService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AjustarDocDeleteDialogComponent]
      })
        .overrideTemplate(AjustarDocDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AjustarDocDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AjustarDocService);
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
