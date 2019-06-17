import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoSolicitud } from 'app/shared/model/tipo-solicitud.model';

type EntityResponseType = HttpResponse<ITipoSolicitud>;
type EntityArrayResponseType = HttpResponse<ITipoSolicitud[]>;

@Injectable({ providedIn: 'root' })
export class TipoSolicitudService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-solicituds';

  constructor(protected http: HttpClient) {}

  create(tipoSolicitud: ITipoSolicitud): Observable<EntityResponseType> {
    return this.http.post<ITipoSolicitud>(this.resourceUrl, tipoSolicitud, { observe: 'response' });
  }

  update(tipoSolicitud: ITipoSolicitud): Observable<EntityResponseType> {
    return this.http.put<ITipoSolicitud>(this.resourceUrl, tipoSolicitud, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoSolicitud>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoSolicitud[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
