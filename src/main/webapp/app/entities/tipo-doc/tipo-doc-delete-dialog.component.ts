import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoDoc } from 'app/shared/model/tipo-doc.model';
import { TipoDocService } from './tipo-doc.service';

@Component({
  selector: 'jhi-tipo-doc-delete-dialog',
  templateUrl: './tipo-doc-delete-dialog.component.html'
})
export class TipoDocDeleteDialogComponent {
  tipoDoc: ITipoDoc;

  constructor(protected tipoDocService: TipoDocService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoDocService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoDocListModification',
        content: 'Deleted an tipoDoc'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-doc-delete-popup',
  template: ''
})
export class TipoDocDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoDoc }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoDocDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoDoc = tipoDoc;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-doc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-doc', { outlets: { popup: null } }]);
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
