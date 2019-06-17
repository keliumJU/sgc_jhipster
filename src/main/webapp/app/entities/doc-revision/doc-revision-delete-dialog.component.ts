import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocRevision } from 'app/shared/model/doc-revision.model';
import { DocRevisionService } from './doc-revision.service';

@Component({
  selector: 'jhi-doc-revision-delete-dialog',
  templateUrl: './doc-revision-delete-dialog.component.html'
})
export class DocRevisionDeleteDialogComponent {
  docRevision: IDocRevision;

  constructor(
    protected docRevisionService: DocRevisionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.docRevisionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'docRevisionListModification',
        content: 'Deleted an docRevision'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-doc-revision-delete-popup',
  template: ''
})
export class DocRevisionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ docRevision }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DocRevisionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.docRevision = docRevision;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/doc-revision', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/doc-revision', { outlets: { popup: null } }]);
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
