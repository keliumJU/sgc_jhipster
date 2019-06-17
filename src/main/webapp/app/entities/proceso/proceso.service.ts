import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProceso } from 'app/shared/model/proceso.model';

type EntityResponseType = HttpResponse<IProceso>;
type EntityArrayResponseType = HttpResponse<IProceso[]>;

@Injectable({ providedIn: 'root' })
export class ProcesoService {
  public resourceUrl = SERVER_API_URL + 'api/procesos';

  constructor(protected http: HttpClient) {}

  create(proceso: IProceso): Observable<EntityResponseType> {
    return this.http.post<IProceso>(this.resourceUrl, proceso, { observe: 'response' });
  }

  update(proceso: IProceso): Observable<EntityResponseType> {
    return this.http.put<IProceso>(this.resourceUrl, proceso, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProceso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProceso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
