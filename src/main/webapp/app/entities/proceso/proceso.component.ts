import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProceso } from 'app/shared/model/proceso.model';
import { AccountService } from 'app/core';
import { ProcesoService } from './proceso.service';

@Component({
  selector: 'jhi-proceso',
  templateUrl: './proceso.component.html'
})
export class ProcesoComponent implements OnInit, OnDestroy {
  procesos: IProceso[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected procesoService: ProcesoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.procesoService
      .query()
      .pipe(
        filter((res: HttpResponse<IProceso[]>) => res.ok),
        map((res: HttpResponse<IProceso[]>) => res.body)
      )
      .subscribe(
        (res: IProceso[]) => {
          this.procesos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProcesos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProceso) {
    return item.id;
  }

  registerChangeInProcesos() {
    this.eventSubscriber = this.eventManager.subscribe('procesoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
