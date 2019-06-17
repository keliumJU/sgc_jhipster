/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DocumentoSGCService } from 'app/entities/documento-sgc/documento-sgc.service';
import { IDocumentoSGC, DocumentoSGC } from 'app/shared/model/documento-sgc.model';

describe('Service Tests', () => {
  describe('DocumentoSGC Service', () => {
    let injector: TestBed;
    let service: DocumentoSGCService;
    let httpMock: HttpTestingController;
    let elemDefault: IDocumentoSGC;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(DocumentoSGCService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DocumentoSGC(0, 0, 0, 0, 'AAAAAAA', 'image/png', 'AAAAAAA', 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a DocumentoSGC', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new DocumentoSGC(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a DocumentoSGC', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 1,
            idProceso: 1,
            idTipoDoc: 1,
            nomDoc: 'BBBBBB',
            ruta: 'BBBBBB',
            idEstado: 1,
            version: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of DocumentoSGC', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 1,
            idProceso: 1,
            idTipoDoc: 1,
            nomDoc: 'BBBBBB',
            ruta: 'BBBBBB',
            idEstado: 1,
            version: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DocumentoSGC', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
