import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MacroProceso } from 'app/shared/model/macro-proceso.model';
import { MacroProcesoService } from './macro-proceso.service';
import { MacroProcesoComponent } from './macro-proceso.component';
import { MacroProcesoDetailComponent } from './macro-proceso-detail.component';
import { MacroProcesoUpdateComponent } from './macro-proceso-update.component';
import { MacroProcesoDeletePopupComponent } from './macro-proceso-delete-dialog.component';
import { IMacroProceso } from 'app/shared/model/macro-proceso.model';

@Injectable({ providedIn: 'root' })
export class MacroProcesoResolve implements Resolve<IMacroProceso> {
  constructor(private service: MacroProcesoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMacroProceso> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MacroProceso>) => response.ok),
        map((macroProceso: HttpResponse<MacroProceso>) => macroProceso.body)
      );
    }
    return of(new MacroProceso());
  }
}

export const macroProcesoRoute: Routes = [
  {
    path: '',
    component: MacroProcesoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.macroProceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MacroProcesoDetailComponent,
    resolve: {
      macroProceso: MacroProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.macroProceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MacroProcesoUpdateComponent,
    resolve: {
      macroProceso: MacroProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.macroProceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MacroProcesoUpdateComponent,
    resolve: {
      macroProceso: MacroProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.macroProceso.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const macroProcesoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MacroProcesoDeletePopupComponent,
    resolve: {
      macroProceso: MacroProcesoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sgcApp.macroProceso.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
