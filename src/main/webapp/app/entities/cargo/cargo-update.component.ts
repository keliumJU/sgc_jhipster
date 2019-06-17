import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICargo, Cargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';

@Component({
  selector: 'jhi-cargo-update',
  templateUrl: './cargo-update.component.html'
})
export class CargoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    cargo: [],
    correoInst: []
  });

  constructor(protected cargoService: CargoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cargo }) => {
      this.updateForm(cargo);
    });
  }

  updateForm(cargo: ICargo) {
    this.editForm.patchValue({
      id: cargo.id,
      cargo: cargo.cargo,
      correoInst: cargo.correoInst
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cargo = this.createFromForm();
    if (cargo.id !== undefined) {
      this.subscribeToSaveResponse(this.cargoService.update(cargo));
    } else {
      this.subscribeToSaveResponse(this.cargoService.create(cargo));
    }
  }

  private createFromForm(): ICargo {
    const entity = {
      ...new Cargo(),
      id: this.editForm.get(['id']).value,
      cargo: this.editForm.get(['cargo']).value,
      correoInst: this.editForm.get(['correoInst']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICargo>>) {
    result.subscribe((res: HttpResponse<ICargo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
