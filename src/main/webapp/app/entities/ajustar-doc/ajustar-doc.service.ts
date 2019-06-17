import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAjustarDoc } from 'app/shared/model/ajustar-doc.model';

type EntityResponseType = HttpResponse<IAjustarDoc>;
type EntityArrayResponseType = HttpResponse<IAjustarDoc[]>;

@Injectable({ providedIn: 'root' })
export class AjustarDocService {
  public resourceUrl = SERVER_API_URL + 'api/ajustar-docs';

  constructor(protected http: HttpClient) {}

  create(ajustarDoc: IAjustarDoc): Observable<EntityResponseType> {
    return this.http.post<IAjustarDoc>(this.resourceUrl, ajustarDoc, { observe: 'response' });
  }

  update(ajustarDoc: IAjustarDoc): Observable<EntityResponseType> {
    return this.http.put<IAjustarDoc>(this.resourceUrl, ajustarDoc, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAjustarDoc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAjustarDoc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
