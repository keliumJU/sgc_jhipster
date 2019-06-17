import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProceso } from 'app/shared/model/proceso.model';
import { ProcesoService } from './proceso.service';

@Component({
  selector: 'jhi-proceso-delete-dialog',
  templateUrl: './proceso-delete-dialog.component.html'
})
export class ProcesoDeleteDialogComponent {
  proceso: IProceso;

  constructor(protected procesoService: ProcesoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.procesoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'procesoListModification',
        content: 'Deleted an proceso'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-proceso-delete-popup',
  template: ''
})
export class ProcesoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ proceso }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProcesoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.proceso = proceso;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/proceso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/proceso', { outlets: { popup: null } }]);
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
