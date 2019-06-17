import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoSolicitud } from 'app/shared/model/tipo-solicitud.model';
import { AccountService } from 'app/core';
import { TipoSolicitudService } from './tipo-solicitud.service';

@Component({
  selector: 'jhi-tipo-solicitud',
  templateUrl: './tipo-solicitud.component.html'
})
export class TipoSolicitudComponent implements OnInit, OnDestroy {
  tipoSolicituds: ITipoSolicitud[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoSolicitudService: TipoSolicitudService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoSolicitudService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoSolicitud[]>) => res.ok),
        map((res: HttpResponse<ITipoSolicitud[]>) => res.body)
      )
      .subscribe(
        (res: ITipoSolicitud[]) => {
          this.tipoSolicituds = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoSolicituds();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoSolicitud) {
    return item.id;
  }

  registerChangeInTipoSolicituds() {
    this.eventSubscriber = this.eventManager.subscribe('tipoSolicitudListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
