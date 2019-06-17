import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccionDoc } from 'app/shared/model/accion-doc.model';

type EntityResponseType = HttpResponse<IAccionDoc>;
type EntityArrayResponseType = HttpResponse<IAccionDoc[]>;

@Injectable({ providedIn: 'root' })
export class AccionDocService {
  public resourceUrl = SERVER_API_URL + 'api/accion-docs';

  constructor(protected http: HttpClient) {}

  create(accionDoc: IAccionDoc): Observable<EntityResponseType> {
    return this.http.post<IAccionDoc>(this.resourceUrl, accionDoc, { observe: 'response' });
  }

  update(accionDoc: IAccionDoc): Observable<EntityResponseType> {
    return this.http.put<IAccionDoc>(this.resourceUrl, accionDoc, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccionDoc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccionDoc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
