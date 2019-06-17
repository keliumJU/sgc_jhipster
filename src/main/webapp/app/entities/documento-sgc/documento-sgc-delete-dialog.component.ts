import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from './documento-sgc.service';

@Component({
  selector: 'jhi-documento-sgc-delete-dialog',
  templateUrl: './documento-sgc-delete-dialog.component.html'
})
export class DocumentoSGCDeleteDialogComponent {
  documentoSGC: IDocumentoSGC;

  constructor(
    protected documentoSGCService: DocumentoSGCService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.documentoSGCService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'documentoSGCListModification',
        content: 'Deleted an documentoSGC'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-documento-sgc-delete-popup',
  template: ''
})
export class DocumentoSGCDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ documentoSGC }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DocumentoSGCDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.documentoSGC = documentoSGC;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/documento-sgc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/documento-sgc', { outlets: { popup: null } }]);
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
