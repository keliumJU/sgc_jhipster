import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SolRevision } from 'app/shared/model/sol-revision.model';
import { SolRevisionService } from './sol-revision.service';
import { SolRevisionComponent } from './sol-revision.component';
import { SolRevisionDetailComponent } from './sol-revision-detail.component';
import { SolRevisionUpdateComponent } from './sol-revision-update.component';
import { SolRevisionDeletePopupComponent } from './sol-revision-delete-dialog.component';
import { ISolRevision } from 'app/shared/model/sol-revision.model';

@Injectable({ providedIn: 'root' })
export class SolRevisionResolve implements Resolve<ISolRevision> {
  constructor(private service: SolRevisionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISolRevision> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SolRevision>) => response.ok),
        map((solRevision: HttpResponse<SolRevision>) => solRevision.body)
      );
    }
    return of(new SolRevision());
  }
}

export const solRevisionRoute: Routes = [
  {
    path: '',
    component: SolRevisionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.solRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SolRevisionDetailComponent,
    resolve: {
      solRevision: SolRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.solRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SolRevisionUpdateComponent,
    resolve: {
      solRevision: SolRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.solRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SolRevisionUpdateComponent,
    resolve: {
      solRevision: SolRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.solRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const solRevisionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SolRevisionDeletePopupComponent,
    resolve: {
      solRevision: SolRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.solRevision.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
