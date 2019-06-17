import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoSolicitud } from 'app/shared/model/tipo-solicitud.model';
import { TipoSolicitudService } from './tipo-solicitud.service';

@Component({
  selector: 'jhi-tipo-solicitud-delete-dialog',
  templateUrl: './tipo-solicitud-delete-dialog.component.html'
})
export class TipoSolicitudDeleteDialogComponent {
  tipoSolicitud: ITipoSolicitud;

  constructor(
    protected tipoSolicitudService: TipoSolicitudService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoSolicitudService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoSolicitudListModification',
        content: 'Deleted an tipoSolicitud'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-solicitud-delete-popup',
  template: ''
})
export class TipoSolicitudDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoSolicitud }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoSolicitudDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoSolicitud = tipoSolicitud;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-solicitud', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-solicitud', { outlets: { popup: null } }]);
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
