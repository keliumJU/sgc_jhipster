import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAjustarDoc } from 'app/shared/model/ajustar-doc.model';
import { AjustarDocService } from './ajustar-doc.service';

@Component({
  selector: 'jhi-ajustar-doc-delete-dialog',
  templateUrl: './ajustar-doc-delete-dialog.component.html'
})
export class AjustarDocDeleteDialogComponent {
  ajustarDoc: IAjustarDoc;

  constructor(
    protected ajustarDocService: AjustarDocService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ajustarDocService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ajustarDocListModification',
        content: 'Deleted an ajustarDoc'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ajustar-doc-delete-popup',
  template: ''
})
export class AjustarDocDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ajustarDoc }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AjustarDocDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ajustarDoc = ajustarDoc;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ajustar-doc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ajustar-doc', { outlets: { popup: null } }]);
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
