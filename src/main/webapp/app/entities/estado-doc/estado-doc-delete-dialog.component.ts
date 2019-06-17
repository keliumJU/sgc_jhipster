import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoDoc } from 'app/shared/model/estado-doc.model';
import { EstadoDocService } from './estado-doc.service';

@Component({
  selector: 'jhi-estado-doc-delete-dialog',
  templateUrl: './estado-doc-delete-dialog.component.html'
})
export class EstadoDocDeleteDialogComponent {
  estadoDoc: IEstadoDoc;

  constructor(protected estadoDocService: EstadoDocService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoDocService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoDocListModification',
        content: 'Deleted an estadoDoc'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-doc-delete-popup',
  template: ''
})
export class EstadoDocDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoDoc }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoDocDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.estadoDoc = estadoDoc;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-doc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-doc', { outlets: { popup: null } }]);
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
