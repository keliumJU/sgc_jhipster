import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICargo } from 'app/shared/model/cargo.model';

type EntityResponseType = HttpResponse<ICargo>;
type EntityArrayResponseType = HttpResponse<ICargo[]>;

@Injectable({ providedIn: 'root' })
export class CargoService {
  public resourceUrl = SERVER_API_URL + 'api/cargos';

  constructor(protected http: HttpClient) {}

  create(cargo: ICargo): Observable<EntityResponseType> {
    return this.http.post<ICargo>(this.resourceUrl, cargo, { observe: 'response' });
  }

  update(cargo: ICargo): Observable<EntityResponseType> {
    return this.http.put<ICargo>(this.resourceUrl, cargo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICargo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICargo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
