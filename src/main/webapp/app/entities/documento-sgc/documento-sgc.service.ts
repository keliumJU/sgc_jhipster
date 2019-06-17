import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

type EntityResponseType = HttpResponse<IDocumentoSGC>;
type EntityArrayResponseType = HttpResponse<IDocumentoSGC[]>;

@Injectable({ providedIn: 'root' })
export class DocumentoSGCService {
  public resourceUrl = SERVER_API_URL + 'api/documento-sgcs';

  constructor(protected http: HttpClient) {}

  create(documentoSGC: IDocumentoSGC): Observable<EntityResponseType> {
    return this.http.post<IDocumentoSGC>(this.resourceUrl, documentoSGC, { observe: 'response' });
  }

  update(documentoSGC: IDocumentoSGC): Observable<EntityResponseType> {
    return this.http.put<IDocumentoSGC>(this.resourceUrl, documentoSGC, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentoSGC>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentoSGC[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
