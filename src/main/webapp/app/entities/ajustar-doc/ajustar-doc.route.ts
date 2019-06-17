import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AjustarDoc } from 'app/shared/model/ajustar-doc.model';
import { AjustarDocService } from './ajustar-doc.service';
import { AjustarDocComponent } from './ajustar-doc.component';
import { AjustarDocDetailComponent } from './ajustar-doc-detail.component';
import { AjustarDocUpdateComponent } from './ajustar-doc-update.component';
import { AjustarDocDeletePopupComponent } from './ajustar-doc-delete-dialog.component';
import { IAjustarDoc } from 'app/shared/model/ajustar-doc.model';

@Injectable({ providedIn: 'root' })
export class AjustarDocResolve implements Resolve<IAjustarDoc> {
  constructor(private service: AjustarDocService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAjustarDoc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AjustarDoc>) => response.ok),
        map((ajustarDoc: HttpResponse<AjustarDoc>) => ajustarDoc.body)
      );
    }
    return of(new AjustarDoc());
  }
}

export const ajustarDocRoute: Routes = [
  {
    path: '',
    component: AjustarDocComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.ajustarDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AjustarDocDetailComponent,
    resolve: {
      ajustarDoc: AjustarDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.ajustarDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AjustarDocUpdateComponent,
    resolve: {
      ajustarDoc: AjustarDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.ajustarDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AjustarDocUpdateComponent,
    resolve: {
      ajustarDoc: AjustarDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.ajustarDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ajustarDocPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AjustarDocDeletePopupComponent,
    resolve: {
      ajustarDoc: AjustarDocResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.ajustarDoc.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
