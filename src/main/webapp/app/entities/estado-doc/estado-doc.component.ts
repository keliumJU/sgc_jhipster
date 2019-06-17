import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoDoc } from 'app/shared/model/estado-doc.model';
import { AccountService } from 'app/core';
import { EstadoDocService } from './estado-doc.service';

@Component({
  selector: 'jhi-estado-doc',
  templateUrl: './estado-doc.component.html'
})
export class EstadoDocComponent implements OnInit, OnDestroy {
  estadoDocs: IEstadoDoc[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoDocService: EstadoDocService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoDocService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoDoc[]>) => res.ok),
        map((res: HttpResponse<IEstadoDoc[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoDoc[]) => {
          this.estadoDocs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoDocs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoDoc) {
    return item.id;
  }

  registerChangeInEstadoDocs() {
    this.eventSubscriber = this.eventManager.subscribe('estadoDocListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
