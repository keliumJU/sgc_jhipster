import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Anexos } from 'app/shared/model/anexos.model';
import { AnexosService } from './anexos.service';
import { AnexosComponent } from './anexos.component';
import { AnexosDetailComponent } from './anexos-detail.component';
import { AnexosUpdateComponent } from './anexos-update.component';
import { AnexosDeletePopupComponent } from './anexos-delete-dialog.component';
import { IAnexos } from 'app/shared/model/anexos.model';

@Injectable({ providedIn: 'root' })
export class AnexosResolve implements Resolve<IAnexos> {
  constructor(private service: AnexosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAnexos> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Anexos>) => response.ok),
        map((anexos: HttpResponse<Anexos>) => anexos.body)
      );
    }
    return of(new Anexos());
  }
}

export const anexosRoute: Routes = [
  {
    path: '',
    component: AnexosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.anexos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AnexosDetailComponent,
    resolve: {
      anexos: AnexosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.anexos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AnexosUpdateComponent,
    resolve: {
      anexos: AnexosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.anexos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AnexosUpdateComponent,
    resolve: {
      anexos: AnexosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.anexos.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const anexosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AnexosDeletePopupComponent,
    resolve: {
      anexos: AnexosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.anexos.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
