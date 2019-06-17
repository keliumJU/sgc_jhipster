import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAccionDoc, AccionDoc } from 'app/shared/model/accion-doc.model';
import { AccionDocService } from './accion-doc.service';

@Component({
  selector: 'jhi-accion-doc-update',
  templateUrl: './accion-doc-update.component.html'
})
export class AccionDocUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    accion: []
  });

  constructor(protected accionDocService: AccionDocService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ accionDoc }) => {
      this.updateForm(accionDoc);
    });
  }

  updateForm(accionDoc: IAccionDoc) {
    this.editForm.patchValue({
      id: accionDoc.id,
      accion: accionDoc.accion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const accionDoc = this.createFromForm();
    if (accionDoc.id !== undefined) {
      this.subscribeToSaveResponse(this.accionDocService.update(accionDoc));
    } else {
      this.subscribeToSaveResponse(this.accionDocService.create(accionDoc));
    }
  }

  private createFromForm(): IAccionDoc {
    const entity = {
      ...new AccionDoc(),
      id: this.editForm.get(['id']).value,
      accion: this.editForm.get(['accion']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccionDoc>>) {
    result.subscribe((res: HttpResponse<IAccionDoc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
