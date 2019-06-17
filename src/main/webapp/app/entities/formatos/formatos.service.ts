import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFormatos } from 'app/shared/model/formatos.model';

type EntityResponseType = HttpResponse<IFormatos>;
type EntityArrayResponseType = HttpResponse<IFormatos[]>;

@Injectable({ providedIn: 'root' })
export class FormatosService {
  public resourceUrl = SERVER_API_URL + 'api/formatos';

  constructor(protected http: HttpClient) {}

  create(formatos: IFormatos): Observable<EntityResponseType> {
    return this.http.post<IFormatos>(this.resourceUrl, formatos, { observe: 'response' });
  }

  update(formatos: IFormatos): Observable<EntityResponseType> {
    return this.http.put<IFormatos>(this.resourceUrl, formatos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormatos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormatos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
