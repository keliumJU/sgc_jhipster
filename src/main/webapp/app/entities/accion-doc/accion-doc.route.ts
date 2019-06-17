import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AccionDoc } from 'app/shared/model/accion-doc.model';
import { AccionDocService } from './accion-doc.service';
import { AccionDocComponent } from './accion-doc.component';
import { AccionDocDetailComponent } from './accion-doc-detail.component';
import { AccionDocUpdateComponent } from './accion-doc-update.component';
import { AccionDocDeletePopupComponent } from './accion-doc-delete-dialog.component';
import { IAccionDoc } from 'app/shared/model/accion-doc.model';

@Injectable({ providedIn: 'root' })
export class AccionDocResolve implements Resolve<IAccionDoc> {
  constructor(private service: AccionDocService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAccionDoc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AccionDoc>) => response.ok),
        map((accionDoc: HttpResponse<AccionDoc>) => accionDoc.body)
      );
    }
    return of(new AccionDoc());
  }
}

export const accionDocRoute: Routes = [
  {
    path: '',
    component: AccionDocComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.accionDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AccionDocDetailComponent,
    resolve: {
      accionDoc: AccionDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.accionDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AccionDocUpdateComponent,
    resolve: {
      accionDoc: AccionDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.accionDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AccionDocUpdateComponent,
    resolve: {
      accionDoc: AccionDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.accionDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const accionDocPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AccionDocDeletePopupComponent,
    resolve: {
      accionDoc: AccionDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.accionDoc.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
