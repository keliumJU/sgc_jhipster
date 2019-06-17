import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISolRevision } from 'app/shared/model/sol-revision.model';
import { AccountService } from 'app/core';
import { SolRevisionService } from './sol-revision.service';

@Component({
  selector: 'jhi-sol-revision',
  templateUrl: './sol-revision.component.html'
})
export class SolRevisionComponent implements OnInit, OnDestroy {
  solRevisions: ISolRevision[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected solRevisionService: SolRevisionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.solRevisionService
      .query()
      .pipe(
        filter((res: HttpResponse<ISolRevision[]>) => res.ok),
        map((res: HttpResponse<ISolRevision[]>) => res.body)
      )
      .subscribe(
        (res: ISolRevision[]) => {
          this.solRevisions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSolRevisions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISolRevision) {
    return item.id;
  }

  registerChangeInSolRevisions() {
    this.eventSubscriber = this.eventManager.subscribe('solRevisionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
