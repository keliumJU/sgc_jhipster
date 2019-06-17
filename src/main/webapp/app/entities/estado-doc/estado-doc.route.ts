import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoDoc } from 'app/shared/model/estado-doc.model';
import { EstadoDocService } from './estado-doc.service';
import { EstadoDocComponent } from './estado-doc.component';
import { EstadoDocDetailComponent } from './estado-doc-detail.component';
import { EstadoDocUpdateComponent } from './estado-doc-update.component';
import { EstadoDocDeletePopupComponent } from './estado-doc-delete-dialog.component';
import { IEstadoDoc } from 'app/shared/model/estado-doc.model';

@Injectable({ providedIn: 'root' })
export class EstadoDocResolve implements Resolve<IEstadoDoc> {
  constructor(private service: EstadoDocService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoDoc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoDoc>) => response.ok),
        map((estadoDoc: HttpResponse<EstadoDoc>) => estadoDoc.body)
      );
    }
    return of(new EstadoDoc());
  }
}

export const estadoDocRoute: Routes = [
  {
    path: '',
    component: EstadoDocComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.estadoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoDocDetailComponent,
    resolve: {
      estadoDoc: EstadoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.estadoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoDocUpdateComponent,
    resolve: {
      estadoDoc: EstadoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.estadoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoDocUpdateComponent,
    resolve: {
      estadoDoc: EstadoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.estadoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoDocPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoDocDeletePopupComponent,
    resolve: {
      estadoDoc: EstadoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.estadoDoc.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
