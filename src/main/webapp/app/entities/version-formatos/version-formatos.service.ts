import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVersionFormatos } from 'app/shared/model/version-formatos.model';

type EntityResponseType = HttpResponse<IVersionFormatos>;
type EntityArrayResponseType = HttpResponse<IVersionFormatos[]>;

@Injectable({ providedIn: 'root' })
export class VersionFormatosService {
  public resourceUrl = SERVER_API_URL + 'api/version-formatos';

  constructor(protected http: HttpClient) {}

  create(versionFormatos: IVersionFormatos): Observable<EntityResponseType> {
    return this.http.post<IVersionFormatos>(this.resourceUrl, versionFormatos, { observe: 'response' });
  }

  update(versionFormatos: IVersionFormatos): Observable<EntityResponseType> {
    return this.http.put<IVersionFormatos>(this.resourceUrl, versionFormatos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVersionFormatos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVersionFormatos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
