import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMacroProceso } from 'app/shared/model/macro-proceso.model';
import { AccountService } from 'app/core';
import { MacroProcesoService } from './macro-proceso.service';

@Component({
  selector: 'jhi-macro-proceso',
  templateUrl: './macro-proceso.component.html'
})
export class MacroProcesoComponent implements OnInit, OnDestroy {
  macroProcesos: IMacroProceso[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected macroProcesoService: MacroProcesoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.macroProcesoService
      .query()
      .pipe(
        filter((res: HttpResponse<IMacroProceso[]>) => res.ok),
        map((res: HttpResponse<IMacroProceso[]>) => res.body)
      )
      .subscribe(
        (res: IMacroProceso[]) => {
          this.macroProcesos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMacroProcesos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMacroProceso) {
    return item.id;
  }

  registerChangeInMacroProcesos() {
    this.eventSubscriber = this.eventManager.subscribe('macroProcesoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
