import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';
import { AccountService } from 'app/core';
import { ElementosDocSGCService } from './elementos-doc-sgc.service';

@Component({
  selector: 'jhi-elementos-doc-sgc',
  templateUrl: './elementos-doc-sgc.component.html'
})
export class ElementosDocSGCComponent implements OnInit, OnDestroy {
  elementosDocSGCS: IElementosDocSGC[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected elementosDocSGCService: ElementosDocSGCService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.elementosDocSGCService
      .query()
      .pipe(
        filter((res: HttpResponse<IElementosDocSGC[]>) => res.ok),
        map((res: HttpResponse<IElementosDocSGC[]>) => res.body)
      )
      .subscribe(
        (res: IElementosDocSGC[]) => {
          this.elementosDocSGCS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInElementosDocSGCS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IElementosDocSGC) {
    return item.id;
  }

  registerChangeInElementosDocSGCS() {
    this.eventSubscriber = this.eventManager.subscribe('elementosDocSGCListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
