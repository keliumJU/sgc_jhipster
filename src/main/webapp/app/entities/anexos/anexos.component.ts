import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAnexos } from 'app/shared/model/anexos.model';
import { AccountService } from 'app/core';
import { AnexosService } from './anexos.service';

@Component({
  selector: 'jhi-anexos',
  templateUrl: './anexos.component.html'
})
export class AnexosComponent implements OnInit, OnDestroy {
  anexos: IAnexos[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected anexosService: AnexosService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.anexosService
      .query()
      .pipe(
        filter((res: HttpResponse<IAnexos[]>) => res.ok),
        map((res: HttpResponse<IAnexos[]>) => res.body)
      )
      .subscribe(
        (res: IAnexos[]) => {
          this.anexos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAnexos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAnexos) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInAnexos() {
    this.eventSubscriber = this.eventManager.subscribe('anexosListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
