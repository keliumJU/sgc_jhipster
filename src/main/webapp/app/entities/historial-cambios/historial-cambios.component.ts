import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IHistorialCambios } from 'app/shared/model/historial-cambios.model';
import { AccountService } from 'app/core';
import { HistorialCambiosService } from './historial-cambios.service';

@Component({
  selector: 'jhi-historial-cambios',
  templateUrl: './historial-cambios.component.html'
})
export class HistorialCambiosComponent implements OnInit, OnDestroy {
  historialCambios: IHistorialCambios[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected historialCambiosService: HistorialCambiosService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.historialCambiosService
      .query()
      .pipe(
        filter((res: HttpResponse<IHistorialCambios[]>) => res.ok),
        map((res: HttpResponse<IHistorialCambios[]>) => res.body)
      )
      .subscribe(
        (res: IHistorialCambios[]) => {
          this.historialCambios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInHistorialCambios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHistorialCambios) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInHistorialCambios() {
    this.eventSubscriber = this.eventManager.subscribe('historialCambiosListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
