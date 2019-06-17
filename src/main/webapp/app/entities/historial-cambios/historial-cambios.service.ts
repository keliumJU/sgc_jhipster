import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHistorialCambios } from 'app/shared/model/historial-cambios.model';

type EntityResponseType = HttpResponse<IHistorialCambios>;
type EntityArrayResponseType = HttpResponse<IHistorialCambios[]>;

@Injectable({ providedIn: 'root' })
export class HistorialCambiosService {
  public resourceUrl = SERVER_API_URL + 'api/historial-cambios';

  constructor(protected http: HttpClient) {}

  create(historialCambios: IHistorialCambios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historialCambios);
    return this.http
      .post<IHistorialCambios>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historialCambios: IHistorialCambios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historialCambios);
    return this.http
      .put<IHistorialCambios>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistorialCambios>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistorialCambios[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historialCambios: IHistorialCambios): IHistorialCambios {
    const copy: IHistorialCambios = Object.assign({}, historialCambios, {
      fecha: historialCambios.fecha != null && historialCambios.fecha.isValid() ? historialCambios.fecha.toJSON() : null,
      vVigente:
        historialCambios.vVigente != null && historialCambios.vVigente.isValid() ? historialCambios.vVigente.format(DATE_FORMAT) : null,
      vObsoleta:
        historialCambios.vObsoleta != null && historialCambios.vObsoleta.isValid() ? historialCambios.vObsoleta.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
      res.body.vVigente = res.body.vVigente != null ? moment(res.body.vVigente) : null;
      res.body.vObsoleta = res.body.vObsoleta != null ? moment(res.body.vObsoleta) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historialCambios: IHistorialCambios) => {
        historialCambios.fecha = historialCambios.fecha != null ? moment(historialCambios.fecha) : null;
        historialCambios.vVigente = historialCambios.vVigente != null ? moment(historialCambios.vVigente) : null;
        historialCambios.vObsoleta = historialCambios.vObsoleta != null ? moment(historialCambios.vObsoleta) : null;
      });
    }
    return res;
  }
}
