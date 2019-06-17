import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';
import { ElementosDocSGCService } from './elementos-doc-sgc.service';
import { ElementosDocSGCComponent } from './elementos-doc-sgc.component';
import { ElementosDocSGCDetailComponent } from './elementos-doc-sgc-detail.component';
import { ElementosDocSGCUpdateComponent } from './elementos-doc-sgc-update.component';
import { ElementosDocSGCDeletePopupComponent } from './elementos-doc-sgc-delete-dialog.component';
import { IElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';

@Injectable({ providedIn: 'root' })
export class ElementosDocSGCResolve implements Resolve<IElementosDocSGC> {
  constructor(private service: ElementosDocSGCService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IElementosDocSGC> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ElementosDocSGC>) => response.ok),
        map((elementosDocSGC: HttpResponse<ElementosDocSGC>) => elementosDocSGC.body)
      );
    }
    return of(new ElementosDocSGC());
  }
}

export const elementosDocSGCRoute: Routes = [
  {
    path: '',
    component: ElementosDocSGCComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.elementosDocSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ElementosDocSGCDetailComponent,
    resolve: {
      elementosDocSGC: ElementosDocSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.elementosDocSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ElementosDocSGCUpdateComponent,
    resolve: {
      elementosDocSGC: ElementosDocSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.elementosDocSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ElementosDocSGCUpdateComponent,
    resolve: {
      elementosDocSGC: ElementosDocSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.elementosDocSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const elementosDocSGCPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ElementosDocSGCDeletePopupComponent,
    resolve: {
      elementosDocSGC: ElementosDocSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.elementosDocSGC.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
