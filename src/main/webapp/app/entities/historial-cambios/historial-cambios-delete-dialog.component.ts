import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistorialCambios } from 'app/shared/model/historial-cambios.model';
import { HistorialCambiosService } from './historial-cambios.service';

@Component({
  selector: 'jhi-historial-cambios-delete-dialog',
  templateUrl: './historial-cambios-delete-dialog.component.html'
})
export class HistorialCambiosDeleteDialogComponent {
  historialCambios: IHistorialCambios;

  constructor(
    protected historialCambiosService: HistorialCambiosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.historialCambiosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'historialCambiosListModification',
        content: 'Deleted an historialCambios'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-historial-cambios-delete-popup',
  template: ''
})
export class HistorialCambiosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ historialCambios }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HistorialCambiosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.historialCambios = historialCambios;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/historial-cambios', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/historial-cambios', { outlets: { popup: null } }]);
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
