import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HistorialCambios } from 'app/shared/model/historial-cambios.model';
import { HistorialCambiosService } from './historial-cambios.service';
import { HistorialCambiosComponent } from './historial-cambios.component';
import { HistorialCambiosDetailComponent } from './historial-cambios-detail.component';
import { HistorialCambiosUpdateComponent } from './historial-cambios-update.component';
import { HistorialCambiosDeletePopupComponent } from './historial-cambios-delete-dialog.component';
import { IHistorialCambios } from 'app/shared/model/historial-cambios.model';

@Injectable({ providedIn: 'root' })
export class HistorialCambiosResolve implements Resolve<IHistorialCambios> {
  constructor(private service: HistorialCambiosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHistorialCambios> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HistorialCambios>) => response.ok),
        map((historialCambios: HttpResponse<HistorialCambios>) => historialCambios.body)
      );
    }
    return of(new HistorialCambios());
  }
}

export const historialCambiosRoute: Routes = [
  {
    path: '',
    component: HistorialCambiosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.historialCambios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistorialCambiosDetailComponent,
    resolve: {
      historialCambios: HistorialCambiosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.historialCambios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistorialCambiosUpdateComponent,
    resolve: {
      historialCambios: HistorialCambiosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.historialCambios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistorialCambiosUpdateComponent,
    resolve: {
      historialCambios: HistorialCambiosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.historialCambios.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const historialCambiosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HistorialCambiosDeletePopupComponent,
    resolve: {
      historialCambios: HistorialCambiosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.historialCambios.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
