import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMacroProceso } from 'app/shared/model/macro-proceso.model';

type EntityResponseType = HttpResponse<IMacroProceso>;
type EntityArrayResponseType = HttpResponse<IMacroProceso[]>;

@Injectable({ providedIn: 'root' })
export class MacroProcesoService {
  public resourceUrl = SERVER_API_URL + 'api/macro-procesos';

  constructor(protected http: HttpClient) {}

  create(macroProceso: IMacroProceso): Observable<EntityResponseType> {
    return this.http.post<IMacroProceso>(this.resourceUrl, macroProceso, { observe: 'response' });
  }

  update(macroProceso: IMacroProceso): Observable<EntityResponseType> {
    return this.http.put<IMacroProceso>(this.resourceUrl, macroProceso, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMacroProceso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMacroProceso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
