import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccionDoc } from 'app/shared/model/accion-doc.model';
import { AccionDocService } from './accion-doc.service';

@Component({
  selector: 'jhi-accion-doc-delete-dialog',
  templateUrl: './accion-doc-delete-dialog.component.html'
})
export class AccionDocDeleteDialogComponent {
  accionDoc: IAccionDoc;

  constructor(protected accionDocService: AccionDocService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.accionDocService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'accionDocListModification',
        content: 'Deleted an accionDoc'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-accion-doc-delete-popup',
  template: ''
})
export class AccionDocDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ accionDoc }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AccionDocDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.accionDoc = accionDoc;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/accion-doc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/accion-doc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
