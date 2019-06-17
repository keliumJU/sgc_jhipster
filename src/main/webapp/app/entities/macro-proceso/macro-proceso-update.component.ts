import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMacroProceso, MacroProceso } from 'app/shared/model/macro-proceso.model';
import { MacroProcesoService } from './macro-proceso.service';

@Component({
  selector: 'jhi-macro-proceso-update',
  templateUrl: './macro-proceso-update.component.html'
})
export class MacroProcesoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    macroProceso: []
  });

  constructor(protected macroProcesoService: MacroProcesoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ macroProceso }) => {
      this.updateForm(macroProceso);
    });
  }

  updateForm(macroProceso: IMacroProceso) {
    this.editForm.patchValue({
      id: macroProceso.id,
      code: macroProceso.code,
      macroProceso: macroProceso.macroProceso
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const macroProceso = this.createFromForm();
    if (macroProceso.id !== undefined) {
      this.subscribeToSaveResponse(this.macroProcesoService.update(macroProceso));
    } else {
      this.subscribeToSaveResponse(this.macroProcesoService.create(macroProceso));
    }
  }

  private createFromForm(): IMacroProceso {
    const entity = {
      ...new MacroProceso(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      macroProceso: this.editForm.get(['macroProceso']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMacroProceso>>) {
    result.subscribe((res: HttpResponse<IMacroProceso>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
