import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Proceso } from 'app/shared/model/proceso.model';
import { ProcesoService } from './proceso.service';
import { ProcesoComponent } from './proceso.component';
import { ProcesoDetailComponent } from './proceso-detail.component';
import { ProcesoUpdateComponent } from './proceso-update.component';
import { ProcesoDeletePopupComponent } from './proceso-delete-dialog.component';
import { IProceso } from 'app/shared/model/proceso.model';

@Injectable({ providedIn: 'root' })
export class ProcesoResolve implements Resolve<IProceso> {
  constructor(private service: ProcesoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProceso> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Proceso>) => response.ok),
        map((proceso: HttpResponse<Proceso>) => proceso.body)
      );
    }
    return of(new Proceso());
  }
}

export const procesoRoute: Routes = [
  {
    path: '',
    component: ProcesoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.proceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProcesoDetailComponent,
    resolve: {
      proceso: ProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.proceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProcesoUpdateComponent,
    resolve: {
      proceso: ProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.proceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProcesoUpdateComponent,
    resolve: {
      proceso: ProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.proceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const procesoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProcesoDeletePopupComponent,
    resolve: {
      proceso: ProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.proceso.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
