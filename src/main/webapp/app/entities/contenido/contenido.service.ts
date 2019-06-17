import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContenido } from 'app/shared/model/contenido.model';

type EntityResponseType = HttpResponse<IContenido>;
type EntityArrayResponseType = HttpResponse<IContenido[]>;

@Injectable({ providedIn: 'root' })
export class ContenidoService {
  public resourceUrl = SERVER_API_URL + 'api/contenidos';

  constructor(protected http: HttpClient) {}

  create(contenido: IContenido): Observable<EntityResponseType> {
    return this.http.post<IContenido>(this.resourceUrl, contenido, { observe: 'response' });
  }

  update(contenido: IContenido): Observable<EntityResponseType> {
    return this.http.put<IContenido>(this.resourceUrl, contenido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContenido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContenido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
