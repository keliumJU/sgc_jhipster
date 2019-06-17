import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoDoc, EstadoDoc } from 'app/shared/model/estado-doc.model';
import { EstadoDocService } from './estado-doc.service';

@Component({
  selector: 'jhi-estado-doc-update',
  templateUrl: './estado-doc-update.component.html'
})
export class EstadoDocUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    estado: []
  });

  constructor(protected estadoDocService: EstadoDocService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoDoc }) => {
      this.updateForm(estadoDoc);
    });
  }

  updateForm(estadoDoc: IEstadoDoc) {
    this.editForm.patchValue({
      id: estadoDoc.id,
      estado: estadoDoc.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoDoc = this.createFromForm();
    if (estadoDoc.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoDocService.update(estadoDoc));
    } else {
      this.subscribeToSaveResponse(this.estadoDocService.create(estadoDoc));
    }
  }

  private createFromForm(): IEstadoDoc {
    const entity = {
      ...new EstadoDoc(),
      id: this.editForm.get(['id']).value,
      estado: this.editForm.get(['estado']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoDoc>>) {
    result.subscribe((res: HttpResponse<IEstadoDoc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
