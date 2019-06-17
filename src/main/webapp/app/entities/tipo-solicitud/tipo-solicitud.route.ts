import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoSolicitud } from 'app/shared/model/tipo-solicitud.model';
import { TipoSolicitudService } from './tipo-solicitud.service';
import { TipoSolicitudComponent } from './tipo-solicitud.component';
import { TipoSolicitudDetailComponent } from './tipo-solicitud-detail.component';
import { TipoSolicitudUpdateComponent } from './tipo-solicitud-update.component';
import { TipoSolicitudDeletePopupComponent } from './tipo-solicitud-delete-dialog.component';
import { ITipoSolicitud } from 'app/shared/model/tipo-solicitud.model';

@Injectable({ providedIn: 'root' })
export class TipoSolicitudResolve implements Resolve<ITipoSolicitud> {
  constructor(private service: TipoSolicitudService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoSolicitud> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoSolicitud>) => response.ok),
        map((tipoSolicitud: HttpResponse<TipoSolicitud>) => tipoSolicitud.body)
      );
    }
    return of(new TipoSolicitud());
  }
}

export const tipoSolicitudRoute: Routes = [
  {
    path: '',
    component: TipoSolicitudComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoSolicitud.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoSolicitudDetailComponent,
    resolve: {
      tipoSolicitud: TipoSolicitudResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoSolicitud.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoSolicitudUpdateComponent,
    resolve: {
      tipoSolicitud: TipoSolicitudResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoSolicitud.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoSolicitudUpdateComponent,
    resolve: {
      tipoSolicitud: TipoSolicitudResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoSolicitud.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoSolicitudPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoSolicitudDeletePopupComponent,
    resolve: {
      tipoSolicitud: TipoSolicitudResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoSolicitud.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
