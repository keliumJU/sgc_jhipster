import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Formatos } from 'app/shared/model/formatos.model';
import { FormatosService } from './formatos.service';
import { FormatosComponent } from './formatos.component';
import { FormatosDetailComponent } from './formatos-detail.component';
import { FormatosUpdateComponent } from './formatos-update.component';
import { FormatosDeletePopupComponent } from './formatos-delete-dialog.component';
import { IFormatos } from 'app/shared/model/formatos.model';

@Injectable({ providedIn: 'root' })
export class FormatosResolve implements Resolve<IFormatos> {
  constructor(private service: FormatosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFormatos> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Formatos>) => response.ok),
        map((formatos: HttpResponse<Formatos>) => formatos.body)
      );
    }
    return of(new Formatos());
  }
}

export const formatosRoute: Routes = [
  {
    path: '',
    component: FormatosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.formatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FormatosDetailComponent,
    resolve: {
      formatos: FormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.formatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FormatosUpdateComponent,
    resolve: {
      formatos: FormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.formatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FormatosUpdateComponent,
    resolve: {
      formatos: FormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.formatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const formatosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FormatosDeletePopupComponent,
    resolve: {
      formatos: FormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.formatos.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
