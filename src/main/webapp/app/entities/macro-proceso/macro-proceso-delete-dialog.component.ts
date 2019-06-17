import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMacroProceso } from 'app/shared/model/macro-proceso.model';
import { MacroProcesoService } from './macro-proceso.service';

@Component({
  selector: 'jhi-macro-proceso-delete-dialog',
  templateUrl: './macro-proceso-delete-dialog.component.html'
})
export class MacroProcesoDeleteDialogComponent {
  macroProceso: IMacroProceso;

  constructor(
    protected macroProcesoService: MacroProcesoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.macroProcesoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'macroProcesoListModification',
        content: 'Deleted an macroProceso'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-macro-proceso-delete-popup',
  template: ''
})
export class MacroProcesoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ macroProceso }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MacroProcesoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.macroProceso = macroProceso;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/macro-proceso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/macro-proceso', { outlets: { popup: null } }]);
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
