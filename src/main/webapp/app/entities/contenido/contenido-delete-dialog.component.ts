import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContenido } from 'app/shared/model/contenido.model';
import { ContenidoService } from './contenido.service';

@Component({
  selector: 'jhi-contenido-delete-dialog',
  templateUrl: './contenido-delete-dialog.component.html'
})
export class ContenidoDeleteDialogComponent {
  contenido: IContenido;

  constructor(protected contenidoService: ContenidoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contenidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'contenidoListModification',
        content: 'Deleted an contenido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-contenido-delete-popup',
  template: ''
})
export class ContenidoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contenido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContenidoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.contenido = contenido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/contenido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/contenido', { outlets: { popup: null } }]);
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
