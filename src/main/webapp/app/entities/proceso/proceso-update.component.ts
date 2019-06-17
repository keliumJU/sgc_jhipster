import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProceso, Proceso } from 'app/shared/model/proceso.model';
import { ProcesoService } from './proceso.service';
import { IMacroProceso } from 'app/shared/model/macro-proceso.model';
import { MacroProcesoService } from 'app/entities/macro-proceso';

@Component({
  selector: 'jhi-proceso-update',
  templateUrl: './proceso-update.component.html'
})
export class ProcesoUpdateComponent implements OnInit {
  isSaving: boolean;

  macroprocesos: IMacroProceso[];

  editForm = this.fb.group({
    id: [],
    code: [],
    proceso: [],
    idMacroProceso: [],
    codDoc: [],
    macroProceso: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected procesoService: ProcesoService,
    protected macroProcesoService: MacroProcesoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ proceso }) => {
      this.updateForm(proceso);
    });
    this.macroProcesoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMacroProceso[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMacroProceso[]>) => response.body)
      )
      .subscribe((res: IMacroProceso[]) => (this.macroprocesos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(proceso: IProceso) {
    this.editForm.patchValue({
      id: proceso.id,
      code: proceso.code,
      proceso: proceso.proceso,
      idMacroProceso: proceso.idMacroProceso,
      codDoc: proceso.codDoc,
      macroProceso: proceso.macroProceso
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const proceso = this.createFromForm();
    if (proceso.id !== undefined) {
      this.subscribeToSaveResponse(this.procesoService.update(proceso));
    } else {
      this.subscribeToSaveResponse(this.procesoService.create(proceso));
    }
  }

  private createFromForm(): IProceso {
    const entity = {
      ...new Proceso(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      proceso: this.editForm.get(['proceso']).value,
      idMacroProceso: this.editForm.get(['idMacroProceso']).value,
      codDoc: this.editForm.get(['codDoc']).value,
      macroProceso: this.editForm.get(['macroProceso']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProceso>>) {
    result.subscribe((res: HttpResponse<IProceso>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackMacroProcesoById(index: number, item: IMacroProceso) {
    return item.id;
  }
}
