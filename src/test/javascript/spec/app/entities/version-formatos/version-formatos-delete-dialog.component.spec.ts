/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SgcTestModule } from '../../../test.module';
import { VersionFormatosDeleteDialogComponent } from 'app/entities/version-formatos/version-formatos-delete-dialog.component';
import { VersionFormatosService } from 'app/entities/version-formatos/version-formatos.service';

describe('Component Tests', () => {
  describe('VersionFormatos Management Delete Component', () => {
    let comp: VersionFormatosDeleteDialogComponent;
    let fixture: ComponentFixture<VersionFormatosDeleteDialogComponent>;
    let service: VersionFormatosService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [VersionFormatosDeleteDialogComponent]
      })
        .overrideTemplate(VersionFormatosDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VersionFormatosDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VersionFormatosService);
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
