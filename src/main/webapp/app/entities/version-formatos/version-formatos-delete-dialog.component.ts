import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVersionFormatos } from 'app/shared/model/version-formatos.model';
import { VersionFormatosService } from './version-formatos.service';

@Component({
  selector: 'jhi-version-formatos-delete-dialog',
  templateUrl: './version-formatos-delete-dialog.component.html'
})
export class VersionFormatosDeleteDialogComponent {
  versionFormatos: IVersionFormatos;

  constructor(
    protected versionFormatosService: VersionFormatosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.versionFormatosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'versionFormatosListModification',
        content: 'Deleted an versionFormatos'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-version-formatos-delete-popup',
  template: ''
})
export class VersionFormatosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ versionFormatos }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VersionFormatosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.versionFormatos = versionFormatos;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/version-formatos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/version-formatos', { outlets: { popup: null } }]);
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
