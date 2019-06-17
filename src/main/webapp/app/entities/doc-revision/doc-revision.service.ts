import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocRevision } from 'app/shared/model/doc-revision.model';

type EntityResponseType = HttpResponse<IDocRevision>;
type EntityArrayResponseType = HttpResponse<IDocRevision[]>;

@Injectable({ providedIn: 'root' })
export class DocRevisionService {
  public resourceUrl = SERVER_API_URL + 'api/doc-revisions';

  constructor(protected http: HttpClient) {}

  create(docRevision: IDocRevision): Observable<EntityResponseType> {
    return this.http.post<IDocRevision>(this.resourceUrl, docRevision, { observe: 'response' });
  }

  update(docRevision: IDocRevision): Observable<EntityResponseType> {
    return this.http.put<IDocRevision>(this.resourceUrl, docRevision, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocRevision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocRevision[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
