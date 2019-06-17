import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoDoc } from 'app/shared/model/tipo-doc.model';
import { TipoDocService } from './tipo-doc.service';
import { TipoDocComponent } from './tipo-doc.component';
import { TipoDocDetailComponent } from './tipo-doc-detail.component';
import { TipoDocUpdateComponent } from './tipo-doc-update.component';
import { TipoDocDeletePopupComponent } from './tipo-doc-delete-dialog.component';
import { ITipoDoc } from 'app/shared/model/tipo-doc.model';

@Injectable({ providedIn: 'root' })
export class TipoDocResolve implements Resolve<ITipoDoc> {
  constructor(private service: TipoDocService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoDoc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoDoc>) => response.ok),
        map((tipoDoc: HttpResponse<TipoDoc>) => tipoDoc.body)
      );
    }
    return of(new TipoDoc());
  }
}

export const tipoDocRoute: Routes = [
  {
    path: '',
    component: TipoDocComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoDocDetailComponent,
    resolve: {
      tipoDoc: TipoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoDocUpdateComponent,
    resolve: {
      tipoDoc: TipoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoDocUpdateComponent,
    resolve: {
      tipoDoc: TipoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoDocPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoDocDeletePopupComponent,
    resolve: {
      tipoDoc: TipoDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.tipoDoc.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
