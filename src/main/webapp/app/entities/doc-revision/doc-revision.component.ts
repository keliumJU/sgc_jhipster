import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocRevision } from 'app/shared/model/doc-revision.model';
import { AccountService } from 'app/core';
import { DocRevisionService } from './doc-revision.service';

@Component({
  selector: 'jhi-doc-revision',
  templateUrl: './doc-revision.component.html'
})
export class DocRevisionComponent implements OnInit, OnDestroy {
  docRevisions: IDocRevision[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected docRevisionService: DocRevisionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.docRevisionService
      .query()
      .pipe(
        filter((res: HttpResponse<IDocRevision[]>) => res.ok),
        map((res: HttpResponse<IDocRevision[]>) => res.body)
      )
      .subscribe(
        (res: IDocRevision[]) => {
          this.docRevisions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDocRevisions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocRevision) {
    return item.id;
  }

  registerChangeInDocRevisions() {
    this.eventSubscriber = this.eventManager.subscribe('docRevisionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
