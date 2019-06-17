/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { HistorialCambiosService } from 'app/entities/historial-cambios/historial-cambios.service';
import { IHistorialCambios, HistorialCambios } from 'app/shared/model/historial-cambios.model';

describe('Service Tests', () => {
  describe('HistorialCambios Service', () => {
    let injector: TestBed;
    let service: HistorialCambiosService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistorialCambios;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(HistorialCambiosService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new HistorialCambios(0, 0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, currentDate, 0, 'image/png', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
            vVigente: currentDate.format(DATE_FORMAT),
            vObsoleta: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a HistorialCambios', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            vVigente: currentDate.format(DATE_FORMAT),
            vObsoleta: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            vVigente: currentDate,
            vObsoleta: currentDate
          },
          returnedFromService
        );
        service
          .create(new HistorialCambios(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a HistorialCambios', async () => {
        const returnedFromService = Object.assign(
          {
            code: 1,
            actividad: 'BBBBBB',
            cambio: 'BBBBBB',
            fecha: currentDate.format(DATE_TIME_FORMAT),
            vVigente: currentDate.format(DATE_FORMAT),
            vObsoleta: currentDate.format(DATE_FORMAT),
            idDoc: 1,
            ruta: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
            vVigente: currentDate,
            vObsoleta: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of HistorialCambios', async () => {
        const returnedFromService = Object.assign(
          {
            code: 1,
            actividad: 'BBBBBB',
            cambio: 'BBBBBB',
            fecha: currentDate.format(DATE_TIME_FORMAT),
            vVigente: currentDate.format(DATE_FORMAT),
            vObsoleta: currentDate.format(DATE_FORMAT),
            idDoc: 1,
            ruta: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            vVigente: currentDate,
            vObsoleta: currentDate
          },
          returnedFromService
        );
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

      it('should delete a HistorialCambios', async () => {
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
