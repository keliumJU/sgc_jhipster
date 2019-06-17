import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocRevision } from 'app/shared/model/doc-revision.model';
import { DocRevisionService } from './doc-revision.service';
import { DocRevisionComponent } from './doc-revision.component';
import { DocRevisionDetailComponent } from './doc-revision-detail.component';
import { DocRevisionUpdateComponent } from './doc-revision-update.component';
import { DocRevisionDeletePopupComponent } from './doc-revision-delete-dialog.component';
import { IDocRevision } from 'app/shared/model/doc-revision.model';

@Injectable({ providedIn: 'root' })
export class DocRevisionResolve implements Resolve<IDocRevision> {
  constructor(private service: DocRevisionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocRevision> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DocRevision>) => response.ok),
        map((docRevision: HttpResponse<DocRevision>) => docRevision.body)
      );
    }
    return of(new DocRevision());
  }
}

export const docRevisionRoute: Routes = [
  {
    path: '',
    component: DocRevisionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.docRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocRevisionDetailComponent,
    resolve: {
      docRevision: DocRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.docRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocRevisionUpdateComponent,
    resolve: {
      docRevision: DocRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.docRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocRevisionUpdateComponent,
    resolve: {
      docRevision: DocRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.docRevision.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const docRevisionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DocRevisionDeletePopupComponent,
    resolve: {
      docRevision: DocRevisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.docRevision.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
