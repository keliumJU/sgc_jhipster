import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAnexos } from 'app/shared/model/anexos.model';

type EntityResponseType = HttpResponse<IAnexos>;
type EntityArrayResponseType = HttpResponse<IAnexos[]>;

@Injectable({ providedIn: 'root' })
export class AnexosService {
  public resourceUrl = SERVER_API_URL + 'api/anexos';

  constructor(protected http: HttpClient) {}

  create(anexos: IAnexos): Observable<EntityResponseType> {
    return this.http.post<IAnexos>(this.resourceUrl, anexos, { observe: 'response' });
  }

  update(anexos: IAnexos): Observable<EntityResponseType> {
    return this.http.put<IAnexos>(this.resourceUrl, anexos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnexos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnexos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
