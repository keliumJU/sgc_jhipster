import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISolRevision } from 'app/shared/model/sol-revision.model';
import { SolRevisionService } from './sol-revision.service';

@Component({
  selector: 'jhi-sol-revision-delete-dialog',
  templateUrl: './sol-revision-delete-dialog.component.html'
})
export class SolRevisionDeleteDialogComponent {
  solRevision: ISolRevision;

  constructor(
    protected solRevisionService: SolRevisionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.solRevisionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'solRevisionListModification',
        content: 'Deleted an solRevision'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sol-revision-delete-popup',
  template: ''
})
export class SolRevisionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ solRevision }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SolRevisionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.solRevision = solRevision;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sol-revision', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sol-revision', { outlets: { popup: null } }]);
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
