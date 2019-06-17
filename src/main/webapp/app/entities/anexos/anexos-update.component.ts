import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAnexos, Anexos } from 'app/shared/model/anexos.model';
import { AnexosService } from './anexos.service';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';

@Component({
  selector: 'jhi-anexos-update',
  templateUrl: './anexos-update.component.html'
})
export class AnexosUpdateComponent implements OnInit {
  isSaving: boolean;

  documentosgcs: IDocumentoSGC[];

  editForm = this.fb.group({
    id: [],
    nomAnexo: [],
    descripcion: [],
    img: [],
    imgContentType: [],
    idPadre: [],
    idDoc: [],
    documentoSGC: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected anexosService: AnexosService,
    protected documentoSGCService: DocumentoSGCService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ anexos }) => {
      this.updateForm(anexos);
    });
    this.documentoSGCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentoSGC[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentoSGC[]>) => response.body)
      )
      .subscribe((res: IDocumentoSGC[]) => (this.documentosgcs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(anexos: IAnexos) {
    this.editForm.patchValue({
      id: anexos.id,
      nomAnexo: anexos.nomAnexo,
      descripcion: anexos.descripcion,
      img: anexos.img,
      imgContentType: anexos.imgContentType,
      idPadre: anexos.idPadre,
      idDoc: anexos.idDoc,
      documentoSGC: anexos.documentoSGC
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
    const anexos = this.createFromForm();
    if (anexos.id !== undefined) {
      this.subscribeToSaveResponse(this.anexosService.update(anexos));
    } else {
      this.subscribeToSaveResponse(this.anexosService.create(anexos));
    }
  }

  private createFromForm(): IAnexos {
    const entity = {
      ...new Anexos(),
      id: this.editForm.get(['id']).value,
      nomAnexo: this.editForm.get(['nomAnexo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      imgContentType: this.editForm.get(['imgContentType']).value,
      img: this.editForm.get(['img']).value,
      idPadre: this.editForm.get(['idPadre']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      documentoSGC: this.editForm.get(['documentoSGC']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnexos>>) {
    result.subscribe((res: HttpResponse<IAnexos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
