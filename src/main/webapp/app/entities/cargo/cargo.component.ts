import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICargo } from 'app/shared/model/cargo.model';
import { AccountService } from 'app/core';
import { CargoService } from './cargo.service';

@Component({
  selector: 'jhi-cargo',
  templateUrl: './cargo.component.html'
})
export class CargoComponent implements OnInit, OnDestroy {
  cargos: ICargo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cargoService: CargoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cargoService
      .query()
      .pipe(
        filter((res: HttpResponse<ICargo[]>) => res.ok),
        map((res: HttpResponse<ICargo[]>) => res.body)
      )
      .subscribe(
        (res: ICargo[]) => {
          this.cargos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCargos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICargo) {
    return item.id;
  }

  registerChangeInCargos() {
    this.eventSubscriber = this.eventManager.subscribe('cargoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
