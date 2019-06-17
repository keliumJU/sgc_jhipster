import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormatos } from 'app/shared/model/formatos.model';
import { FormatosService } from './formatos.service';

@Component({
  selector: 'jhi-formatos-delete-dialog',
  templateUrl: './formatos-delete-dialog.component.html'
})
export class FormatosDeleteDialogComponent {
  formatos: IFormatos;

  constructor(protected formatosService: FormatosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.formatosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'formatosListModification',
        content: 'Deleted an formatos'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-formatos-delete-popup',
  template: ''
})
export class FormatosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formatos }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FormatosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.formatos = formatos;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/formatos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/formatos', { outlets: { popup: null } }]);
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
