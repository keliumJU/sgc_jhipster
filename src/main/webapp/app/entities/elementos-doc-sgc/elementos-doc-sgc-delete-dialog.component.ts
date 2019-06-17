import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';
import { ElementosDocSGCService } from './elementos-doc-sgc.service';

@Component({
  selector: 'jhi-elementos-doc-sgc-delete-dialog',
  templateUrl: './elementos-doc-sgc-delete-dialog.component.html'
})
export class ElementosDocSGCDeleteDialogComponent {
  elementosDocSGC: IElementosDocSGC;

  constructor(
    protected elementosDocSGCService: ElementosDocSGCService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.elementosDocSGCService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'elementosDocSGCListModification',
        content: 'Deleted an elementosDocSGC'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-elementos-doc-sgc-delete-popup',
  template: ''
})
export class ElementosDocSGCDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ elementosDocSGC }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ElementosDocSGCDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.elementosDocSGC = elementosDocSGC;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/elementos-doc-sgc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/elementos-doc-sgc', { outlets: { popup: null } }]);
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
