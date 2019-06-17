import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContenido } from 'app/shared/model/contenido.model';
import { AccountService } from 'app/core';
import { ContenidoService } from './contenido.service';

@Component({
  selector: 'jhi-contenido',
  templateUrl: './contenido.component.html'
})
export class ContenidoComponent implements OnInit, OnDestroy {
  contenidos: IContenido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected contenidoService: ContenidoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.contenidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IContenido[]>) => res.ok),
        map((res: HttpResponse<IContenido[]>) => res.body)
      )
      .subscribe(
        (res: IContenido[]) => {
          this.contenidos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInContenidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContenido) {
    return item.id;
  }

  registerChangeInContenidos() {
    this.eventSubscriber = this.eventManager.subscribe('contenidoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
