import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnexos } from 'app/shared/model/anexos.model';
import { AnexosService } from './anexos.service';

@Component({
  selector: 'jhi-anexos-delete-dialog',
  templateUrl: './anexos-delete-dialog.component.html'
})
export class AnexosDeleteDialogComponent {
  anexos: IAnexos;

  constructor(protected anexosService: AnexosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.anexosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'anexosListModification',
        content: 'Deleted an anexos'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-anexos-delete-popup',
  template: ''
})
export class AnexosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anexos }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AnexosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.anexos = anexos;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/anexos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/anexos', { outlets: { popup: null } }]);
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
