import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDocumentoSGC, DocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from './documento-sgc.service';
import { IEstadoDoc } from 'app/shared/model/estado-doc.model';
import { EstadoDocService } from 'app/entities/estado-doc';
import { IProceso } from 'app/shared/model/proceso.model';
import { ProcesoService } from 'app/entities/proceso';
import { ITipoDoc } from 'app/shared/model/tipo-doc.model';
import { TipoDocService } from 'app/entities/tipo-doc';

@Component({
  selector: 'jhi-documento-sgc-update',
  templateUrl: './documento-sgc-update.component.html'
})
export class DocumentoSGCUpdateComponent implements OnInit {
  isSaving: boolean;

  estadodocs: IEstadoDoc[];

  procesos: IProceso[];

  tipodocs: ITipoDoc[];

  editForm = this.fb.group({
    id: [],
    codigo: [],
    idProceso: [],
    idTipoDoc: [],
    nomDoc: [null, [Validators.required]],
    ruta: [],
    rutaContentType: [],
    idEstado: [],
    version: [],
    estadoDoc: [],
    proceso: [],
    tipoDoc: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected documentoSGCService: DocumentoSGCService,
    protected estadoDocService: EstadoDocService,
    protected procesoService: ProcesoService,
    protected tipoDocService: TipoDocService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ documentoSGC }) => {
      this.updateForm(documentoSGC);
    });
    this.estadoDocService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoDoc[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoDoc[]>) => response.body)
      )
      .subscribe((res: IEstadoDoc[]) => (this.estadodocs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.procesoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProceso[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProceso[]>) => response.body)
      )
      .subscribe((res: IProceso[]) => (this.procesos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoDocService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoDoc[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoDoc[]>) => response.body)
      )
      .subscribe((res: ITipoDoc[]) => (this.tipodocs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(documentoSGC: IDocumentoSGC) {
    this.editForm.patchValue({
      id: documentoSGC.id,
      codigo: documentoSGC.codigo,
      idProceso: documentoSGC.idProceso,
      idTipoDoc: documentoSGC.idTipoDoc,
      nomDoc: documentoSGC.nomDoc,
      ruta: documentoSGC.ruta,
      rutaContentType: documentoSGC.rutaContentType,
      idEstado: documentoSGC.idEstado,
      version: documentoSGC.version,
      estadoDoc: documentoSGC.estadoDoc,
      proceso: documentoSGC.proceso,
      tipoDoc: documentoSGC.tipoDoc
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
    const documentoSGC = this.createFromForm();
    if (documentoSGC.id !== undefined) {
      this.subscribeToSaveResponse(this.documentoSGCService.update(documentoSGC));
    } else {
      this.subscribeToSaveResponse(this.documentoSGCService.create(documentoSGC));
    }
  }

  private createFromForm(): IDocumentoSGC {
    const entity = {
      ...new DocumentoSGC(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      idProceso: this.editForm.get(['idProceso']).value,
      idTipoDoc: this.editForm.get(['idTipoDoc']).value,
      nomDoc: this.editForm.get(['nomDoc']).value,
      rutaContentType: this.editForm.get(['rutaContentType']).value,
      ruta: this.editForm.get(['ruta']).value,
      idEstado: this.editForm.get(['idEstado']).value,
      version: this.editForm.get(['version']).value,
      estadoDoc: this.editForm.get(['estadoDoc']).value,
      proceso: this.editForm.get(['proceso']).value,
      tipoDoc: this.editForm.get(['tipoDoc']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentoSGC>>) {
    result.subscribe((res: HttpResponse<IDocumentoSGC>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackEstadoDocById(index: number, item: IEstadoDoc) {
    return item.id;
  }

  trackProcesoById(index: number, item: IProceso) {
    return item.id;
  }

  trackTipoDocById(index: number, item: ITipoDoc) {
    return item.id;
  }
}
