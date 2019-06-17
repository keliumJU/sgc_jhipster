import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoDoc } from 'app/shared/model/tipo-doc.model';
import { AccountService } from 'app/core';
import { TipoDocService } from './tipo-doc.service';

@Component({
  selector: 'jhi-tipo-doc',
  templateUrl: './tipo-doc.component.html'
})
export class TipoDocComponent implements OnInit, OnDestroy {
  tipoDocs: ITipoDoc[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoDocService: TipoDocService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoDocService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoDoc[]>) => res.ok),
        map((res: HttpResponse<ITipoDoc[]>) => res.body)
      )
      .subscribe(
        (res: ITipoDoc[]) => {
          this.tipoDocs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoDocs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoDoc) {
    return item.id;
  }

  registerChangeInTipoDocs() {
    this.eventSubscriber = this.eventManager.subscribe('tipoDocListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
