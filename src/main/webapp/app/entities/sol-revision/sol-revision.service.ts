import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISolRevision } from 'app/shared/model/sol-revision.model';

type EntityResponseType = HttpResponse<ISolRevision>;
type EntityArrayResponseType = HttpResponse<ISolRevision[]>;

@Injectable({ providedIn: 'root' })
export class SolRevisionService {
  public resourceUrl = SERVER_API_URL + 'api/sol-revisions';

  constructor(protected http: HttpClient) {}

  create(solRevision: ISolRevision): Observable<EntityResponseType> {
    return this.http.post<ISolRevision>(this.resourceUrl, solRevision, { observe: 'response' });
  }

  update(solRevision: ISolRevision): Observable<EntityResponseType> {
    return this.http.put<ISolRevision>(this.resourceUrl, solRevision, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISolRevision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISolRevision[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
