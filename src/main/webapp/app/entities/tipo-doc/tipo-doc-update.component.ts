import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoDoc, TipoDoc } from 'app/shared/model/tipo-doc.model';
import { TipoDocService } from './tipo-doc.service';

@Component({
  selector: 'jhi-tipo-doc-update',
  templateUrl: './tipo-doc-update.component.html'
})
export class TipoDocUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    tipoDoc: [],
    codTip: []
  });

  constructor(protected tipoDocService: TipoDocService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoDoc }) => {
      this.updateForm(tipoDoc);
    });
  }

  updateForm(tipoDoc: ITipoDoc) {
    this.editForm.patchValue({
      id: tipoDoc.id,
      code: tipoDoc.code,
      tipoDoc: tipoDoc.tipoDoc,
      codTip: tipoDoc.codTip
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoDoc = this.createFromForm();
    if (tipoDoc.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDocService.update(tipoDoc));
    } else {
      this.subscribeToSaveResponse(this.tipoDocService.create(tipoDoc));
    }
  }

  private createFromForm(): ITipoDoc {
    const entity = {
      ...new TipoDoc(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      tipoDoc: this.editForm.get(['tipoDoc']).value,
      codTip: this.editForm.get(['codTip']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDoc>>) {
    result.subscribe((res: HttpResponse<ITipoDoc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
