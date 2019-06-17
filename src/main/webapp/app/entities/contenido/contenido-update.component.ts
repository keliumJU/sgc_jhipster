import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContenido, Contenido } from 'app/shared/model/contenido.model';
import { ContenidoService } from './contenido.service';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';

@Component({
  selector: 'jhi-contenido-update',
  templateUrl: './contenido-update.component.html'
})
export class ContenidoUpdateComponent implements OnInit {
  isSaving: boolean;

  documentosgcs: IDocumentoSGC[];

  editForm = this.fb.group({
    id: [],
    actividad: [],
    descripcion: [],
    responsable: [],
    registro: [],
    idDoc: [],
    documentoSGC: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected contenidoService: ContenidoService,
    protected documentoSGCService: DocumentoSGCService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contenido }) => {
      this.updateForm(contenido);
    });
    this.documentoSGCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentoSGC[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentoSGC[]>) => response.body)
      )
      .subscribe((res: IDocumentoSGC[]) => (this.documentosgcs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(contenido: IContenido) {
    this.editForm.patchValue({
      id: contenido.id,
      actividad: contenido.actividad,
      descripcion: contenido.descripcion,
      responsable: contenido.responsable,
      registro: contenido.registro,
      idDoc: contenido.idDoc,
      documentoSGC: contenido.documentoSGC
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contenido = this.createFromForm();
    if (contenido.id !== undefined) {
      this.subscribeToSaveResponse(this.contenidoService.update(contenido));
    } else {
      this.subscribeToSaveResponse(this.contenidoService.create(contenido));
    }
  }

  private createFromForm(): IContenido {
    const entity = {
      ...new Contenido(),
      id: this.editForm.get(['id']).value,
      actividad: this.editForm.get(['actividad']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      responsable: this.editForm.get(['responsable']).value,
      registro: this.editForm.get(['registro']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      documentoSGC: this.editForm.get(['documentoSGC']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContenido>>) {
    result.subscribe((res: HttpResponse<IContenido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
