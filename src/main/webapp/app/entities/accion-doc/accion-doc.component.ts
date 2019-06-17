import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccionDoc } from 'app/shared/model/accion-doc.model';
import { AccountService } from 'app/core';
import { AccionDocService } from './accion-doc.service';

@Component({
  selector: 'jhi-accion-doc',
  templateUrl: './accion-doc.component.html'
})
export class AccionDocComponent implements OnInit, OnDestroy {
  accionDocs: IAccionDoc[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected accionDocService: AccionDocService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.accionDocService
      .query()
      .pipe(
        filter((res: HttpResponse<IAccionDoc[]>) => res.ok),
        map((res: HttpResponse<IAccionDoc[]>) => res.body)
      )
      .subscribe(
        (res: IAccionDoc[]) => {
          this.accionDocs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAccionDocs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAccionDoc) {
    return item.id;
  }

  registerChangeInAccionDocs() {
    this.eventSubscriber = this.eventManager.subscribe('accionDocListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
