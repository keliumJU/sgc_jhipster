import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoDoc } from 'app/shared/model/tipo-doc.model';

type EntityResponseType = HttpResponse<ITipoDoc>;
type EntityArrayResponseType = HttpResponse<ITipoDoc[]>;

@Injectable({ providedIn: 'root' })
export class TipoDocService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-docs';

  constructor(protected http: HttpClient) {}

  create(tipoDoc: ITipoDoc): Observable<EntityResponseType> {
    return this.http.post<ITipoDoc>(this.resourceUrl, tipoDoc, { observe: 'response' });
  }

  update(tipoDoc: ITipoDoc): Observable<EntityResponseType> {
    return this.http.put<ITipoDoc>(this.resourceUrl, tipoDoc, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoDoc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoDoc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
