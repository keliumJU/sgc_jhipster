import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { AccountService } from 'app/core';
import { DocumentoSGCService } from './documento-sgc.service';

@Component({
  selector: 'jhi-documento-sgc',
  templateUrl: './documento-sgc.component.html'
})
export class DocumentoSGCComponent implements OnInit, OnDestroy {
  documentoSGCS: IDocumentoSGC[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected documentoSGCService: DocumentoSGCService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.documentoSGCService
      .query()
      .pipe(
        filter((res: HttpResponse<IDocumentoSGC[]>) => res.ok),
        map((res: HttpResponse<IDocumentoSGC[]>) => res.body)
      )
      .subscribe(
        (res: IDocumentoSGC[]) => {
          this.documentoSGCS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDocumentoSGCS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocumentoSGC) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInDocumentoSGCS() {
    this.eventSubscriber = this.eventManager.subscribe('documentoSGCListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
