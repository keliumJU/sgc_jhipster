import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFormatos } from 'app/shared/model/formatos.model';
import { AccountService } from 'app/core';
import { FormatosService } from './formatos.service';

@Component({
  selector: 'jhi-formatos',
  templateUrl: './formatos.component.html'
})
export class FormatosComponent implements OnInit, OnDestroy {
  formatos: IFormatos[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected formatosService: FormatosService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.formatosService
      .query()
      .pipe(
        filter((res: HttpResponse<IFormatos[]>) => res.ok),
        map((res: HttpResponse<IFormatos[]>) => res.body)
      )
      .subscribe(
        (res: IFormatos[]) => {
          this.formatos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFormatos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFormatos) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInFormatos() {
    this.eventSubscriber = this.eventManager.subscribe('formatosListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
