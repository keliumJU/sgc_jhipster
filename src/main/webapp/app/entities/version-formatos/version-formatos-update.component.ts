import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IVersionFormatos, VersionFormatos } from 'app/shared/model/version-formatos.model';
import { VersionFormatosService } from './version-formatos.service';

@Component({
  selector: 'jhi-version-formatos-update',
  templateUrl: './version-formatos-update.component.html'
})
export class VersionFormatosUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    idFormato: [],
    rutaFormato: [],
    rutaFormatoContentType: [],
    nomFormato: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected versionFormatosService: VersionFormatosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ versionFormatos }) => {
      this.updateForm(versionFormatos);
    });
  }

  updateForm(versionFormatos: IVersionFormatos) {
    this.editForm.patchValue({
      id: versionFormatos.id,
      code: versionFormatos.code,
      idFormato: versionFormatos.idFormato,
      rutaFormato: versionFormatos.rutaFormato,
      rutaFormatoContentType: versionFormatos.rutaFormatoContentType,
      nomFormato: versionFormatos.nomFormato
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
    const versionFormatos = this.createFromForm();
    if (versionFormatos.id !== undefined) {
      this.subscribeToSaveResponse(this.versionFormatosService.update(versionFormatos));
    } else {
      this.subscribeToSaveResponse(this.versionFormatosService.create(versionFormatos));
    }
  }

  private createFromForm(): IVersionFormatos {
    const entity = {
      ...new VersionFormatos(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      idFormato: this.editForm.get(['idFormato']).value,
      rutaFormatoContentType: this.editForm.get(['rutaFormatoContentType']).value,
      rutaFormato: this.editForm.get(['rutaFormato']).value,
      nomFormato: this.editForm.get(['nomFormato']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVersionFormatos>>) {
    result.subscribe((res: HttpResponse<IVersionFormatos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
