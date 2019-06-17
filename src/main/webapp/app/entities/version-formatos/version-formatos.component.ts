import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IVersionFormatos } from 'app/shared/model/version-formatos.model';
import { AccountService } from 'app/core';
import { VersionFormatosService } from './version-formatos.service';

@Component({
  selector: 'jhi-version-formatos',
  templateUrl: './version-formatos.component.html'
})
export class VersionFormatosComponent implements OnInit, OnDestroy {
  versionFormatos: IVersionFormatos[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected versionFormatosService: VersionFormatosService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.versionFormatosService
      .query()
      .pipe(
        filter((res: HttpResponse<IVersionFormatos[]>) => res.ok),
        map((res: HttpResponse<IVersionFormatos[]>) => res.body)
      )
      .subscribe(
        (res: IVersionFormatos[]) => {
          this.versionFormatos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVersionFormatos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVersionFormatos) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInVersionFormatos() {
    this.eventSubscriber = this.eventManager.subscribe('versionFormatosListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
