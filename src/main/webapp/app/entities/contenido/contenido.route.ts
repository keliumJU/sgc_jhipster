import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Contenido } from 'app/shared/model/contenido.model';
import { ContenidoService } from './contenido.service';
import { ContenidoComponent } from './contenido.component';
import { ContenidoDetailComponent } from './contenido-detail.component';
import { ContenidoUpdateComponent } from './contenido-update.component';
import { ContenidoDeletePopupComponent } from './contenido-delete-dialog.component';
import { IContenido } from 'app/shared/model/contenido.model';

@Injectable({ providedIn: 'root' })
export class ContenidoResolve implements Resolve<IContenido> {
  constructor(private service: ContenidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContenido> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Contenido>) => response.ok),
        map((contenido: HttpResponse<Contenido>) => contenido.body)
      );
    }
    return of(new Contenido());
  }
}

export const contenidoRoute: Routes = [
  {
    path: '',
    component: ContenidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.contenido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContenidoDetailComponent,
    resolve: {
      contenido: ContenidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.contenido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContenidoUpdateComponent,
    resolve: {
      contenido: ContenidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.contenido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContenidoUpdateComponent,
    resolve: {
      contenido: ContenidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.contenido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contenidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContenidoDeletePopupComponent,
    resolve: {
      contenido: ContenidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.contenido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
