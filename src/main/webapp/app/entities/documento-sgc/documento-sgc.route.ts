import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from './documento-sgc.service';
import { DocumentoSGCComponent } from './documento-sgc.component';
import { DocumentoSGCDetailComponent } from './documento-sgc-detail.component';
import { DocumentoSGCUpdateComponent } from './documento-sgc-update.component';
import { DocumentoSGCDeletePopupComponent } from './documento-sgc-delete-dialog.component';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

@Injectable({ providedIn: 'root' })
export class DocumentoSGCResolve implements Resolve<IDocumentoSGC> {
  constructor(private service: DocumentoSGCService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentoSGC> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DocumentoSGC>) => response.ok),
        map((documentoSGC: HttpResponse<DocumentoSGC>) => documentoSGC.body)
      );
    }
    return of(new DocumentoSGC());
  }
}

export const documentoSGCRoute: Routes = [
  {
    path: '',
    component: DocumentoSGCComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.documentoSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentoSGCDetailComponent,
    resolve: {
      documentoSGC: DocumentoSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.documentoSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentoSGCUpdateComponent,
    resolve: {
      documentoSGC: DocumentoSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.documentoSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentoSGCUpdateComponent,
    resolve: {
      documentoSGC: DocumentoSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.documentoSGC.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const documentoSGCPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DocumentoSGCDeletePopupComponent,
    resolve: {
      documentoSGC: DocumentoSGCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.documentoSGC.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
