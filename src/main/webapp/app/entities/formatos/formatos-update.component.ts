import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IFormatos, Formatos } from 'app/shared/model/formatos.model';
import { FormatosService } from './formatos.service';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';

@Component({
  selector: 'jhi-formatos-update',
  templateUrl: './formatos-update.component.html'
})
export class FormatosUpdateComponent implements OnInit {
  isSaving: boolean;

  documentosgcs: IDocumentoSGC[];

  editForm = this.fb.group({
    id: [],
    nomFormato: [],
    rutaFormato: [],
    rutaFormatoContentType: [],
    idDoc: [],
    documentoSGC: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected formatosService: FormatosService,
    protected documentoSGCService: DocumentoSGCService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ formatos }) => {
      this.updateForm(formatos);
    });
    this.documentoSGCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentoSGC[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentoSGC[]>) => response.body)
      )
      .subscribe((res: IDocumentoSGC[]) => (this.documentosgcs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(formatos: IFormatos) {
    this.editForm.patchValue({
      id: formatos.id,
      nomFormato: formatos.nomFormato,
      rutaFormato: formatos.rutaFormato,
      rutaFormatoContentType: formatos.rutaFormatoContentType,
      idDoc: formatos.idDoc,
      documentoSGC: formatos.documentoSGC
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
    const formatos = this.createFromForm();
    if (formatos.id !== undefined) {
      this.subscribeToSaveResponse(this.formatosService.update(formatos));
    } else {
      this.subscribeToSaveResponse(this.formatosService.create(formatos));
    }
  }

  private createFromForm(): IFormatos {
    const entity = {
      ...new Formatos(),
      id: this.editForm.get(['id']).value,
      nomFormato: this.editForm.get(['nomFormato']).value,
      rutaFormatoContentType: this.editForm.get(['rutaFormatoContentType']).value,
      rutaFormato: this.editForm.get(['rutaFormato']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      documentoSGC: this.editForm.get(['documentoSGC']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormatos>>) {
    result.subscribe((res: HttpResponse<IFormatos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
