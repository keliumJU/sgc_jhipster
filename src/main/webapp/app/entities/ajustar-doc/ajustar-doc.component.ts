import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAjustarDoc } from 'app/shared/model/ajustar-doc.model';
import { AccountService } from 'app/core';
import { AjustarDocService } from './ajustar-doc.service';

@Component({
  selector: 'jhi-ajustar-doc',
  templateUrl: './ajustar-doc.component.html'
})
export class AjustarDocComponent implements OnInit, OnDestroy {
  ajustarDocs: IAjustarDoc[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ajustarDocService: AjustarDocService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ajustarDocService
      .query()
      .pipe(
        filter((res: HttpResponse<IAjustarDoc[]>) => res.ok),
        map((res: HttpResponse<IAjustarDoc[]>) => res.body)
      )
      .subscribe(
        (res: IAjustarDoc[]) => {
          this.ajustarDocs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAjustarDocs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAjustarDoc) {
    return item.id;
  }

  registerChangeInAjustarDocs() {
    this.eventSubscriber = this.eventManager.subscribe('ajustarDocListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
