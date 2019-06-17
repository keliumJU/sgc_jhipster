import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VersionFormatos } from 'app/shared/model/version-formatos.model';
import { VersionFormatosService } from './version-formatos.service';
import { VersionFormatosComponent } from './version-formatos.component';
import { VersionFormatosDetailComponent } from './version-formatos-detail.component';
import { VersionFormatosUpdateComponent } from './version-formatos-update.component';
import { VersionFormatosDeletePopupComponent } from './version-formatos-delete-dialog.component';
import { IVersionFormatos } from 'app/shared/model/version-formatos.model';

@Injectable({ providedIn: 'root' })
export class VersionFormatosResolve implements Resolve<IVersionFormatos> {
  constructor(private service: VersionFormatosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVersionFormatos> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<VersionFormatos>) => response.ok),
        map((versionFormatos: HttpResponse<VersionFormatos>) => versionFormatos.body)
      );
    }
    return of(new VersionFormatos());
  }
}

export const versionFormatosRoute: Routes = [
  {
    path: '',
    component: VersionFormatosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.versionFormatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VersionFormatosDetailComponent,
    resolve: {
      versionFormatos: VersionFormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.versionFormatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VersionFormatosUpdateComponent,
    resolve: {
      versionFormatos: VersionFormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.versionFormatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VersionFormatosUpdateComponent,
    resolve: {
      versionFormatos: VersionFormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.versionFormatos.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const versionFormatosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VersionFormatosDeletePopupComponent,
    resolve: {
      versionFormatos: VersionFormatosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.versionFormatos.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
