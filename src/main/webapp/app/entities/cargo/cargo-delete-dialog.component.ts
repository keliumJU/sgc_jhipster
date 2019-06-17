import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';

@Component({
  selector: 'jhi-cargo-delete-dialog',
  templateUrl: './cargo-delete-dialog.component.html'
})
export class CargoDeleteDialogComponent {
  cargo: ICargo;

  constructor(protected cargoService: CargoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cargoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cargoListModification',
        content: 'Deleted an cargo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cargo-delete-popup',
  template: ''
})
export class CargoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cargo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CargoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cargo = cargo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cargo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cargo', { outlets: { popup: null } }]);
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
