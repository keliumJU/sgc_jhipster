import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IHistorialCambios, HistorialCambios } from 'app/shared/model/historial-cambios.model';
import { HistorialCambiosService } from './historial-cambios.service';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';

@Component({
  selector: 'jhi-historial-cambios-update',
  templateUrl: './historial-cambios-update.component.html'
})
export class HistorialCambiosUpdateComponent implements OnInit {
  isSaving: boolean;

  documentosgcs: IDocumentoSGC[];
  vVigenteDp: any;
  vObsoletaDp: any;

  editForm = this.fb.group({
    id: [],
    code: [],
    actividad: [],
    cambio: [],
    fecha: [],
    vVigente: [],
    vObsoleta: [],
    idDoc: [],
    ruta: [],
    rutaContentType: [],
    documentoSGC: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected historialCambiosService: HistorialCambiosService,
    protected documentoSGCService: DocumentoSGCService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ historialCambios }) => {
      this.updateForm(historialCambios);
    });
    this.documentoSGCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentoSGC[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentoSGC[]>) => response.body)
      )
      .subscribe((res: IDocumentoSGC[]) => (this.documentosgcs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(historialCambios: IHistorialCambios) {
    this.editForm.patchValue({
      id: historialCambios.id,
      code: historialCambios.code,
      actividad: historialCambios.actividad,
      cambio: historialCambios.cambio,
      fecha: historialCambios.fecha != null ? historialCambios.fecha.format(DATE_TIME_FORMAT) : null,
      vVigente: historialCambios.vVigente,
      vObsoleta: historialCambios.vObsoleta,
      idDoc: historialCambios.idDoc,
      ruta: historialCambios.ruta,
      rutaContentType: historialCambios.rutaContentType,
      documentoSGC: historialCambios.documentoSGC
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const historialCambios = this.createFromForm();
    if (historialCambios.id !== undefined) {
      this.subscribeToSaveResponse(this.historialCambiosService.update(historialCambios));
    } else {
      this.subscribeToSaveResponse(this.historialCambiosService.create(historialCambios));
    }
  }

  private createFromForm(): IHistorialCambios {
    const entity = {
      ...new HistorialCambios(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      actividad: this.editForm.get(['actividad']).value,
      cambio: this.editForm.get(['cambio']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      vVigente: this.editForm.get(['vVigente']).value,
      vObsoleta: this.editForm.get(['vObsoleta']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      rutaContentType: this.editForm.get(['rutaContentType']).value,
      ruta: this.editForm.get(['ruta']).value,
      documentoSGC: this.editForm.get(['documentoSGC']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistorialCambios>>) {
    result.subscribe((res: HttpResponse<IHistorialCambios>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDocumentoSGCById(index: number, item: IDocumentoSGC) {
    return item.id;
  }
}
