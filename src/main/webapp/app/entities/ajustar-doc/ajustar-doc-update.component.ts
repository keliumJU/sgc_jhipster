import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAjustarDoc, AjustarDoc } from 'app/shared/model/ajustar-doc.model';
import { AjustarDocService } from './ajustar-doc.service';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';
import { IUser, UserService } from 'app/core';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo';
import { IAccionDoc } from 'app/shared/model/accion-doc.model';
import { AccionDocService } from 'app/entities/accion-doc';

@Component({
  selector: 'jhi-ajustar-doc-update',
  templateUrl: './ajustar-doc-update.component.html'
})
export class AjustarDocUpdateComponent implements OnInit {
  isSaving: boolean;

  documentosgcs: IDocumentoSGC[];

  users: IUser[];

  cargos: ICargo[];

  acciondocs: IAccionDoc[];

  editForm = this.fb.group({
    id: [],
    code: [],
    idUser: [],
    idCargo: [],
    idAccion: [],
    idDoc: [],
    documentoSGC: [],
    user: [],
    cargo: [],
    accionDoc: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ajustarDocService: AjustarDocService,
    protected documentoSGCService: DocumentoSGCService,
    protected userService: UserService,
    protected cargoService: CargoService,
    protected accionDocService: AccionDocService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ajustarDoc }) => {
      this.updateForm(ajustarDoc);
    });
    this.documentoSGCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentoSGC[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentoSGC[]>) => response.body)
      )
      .subscribe((res: IDocumentoSGC[]) => (this.documentosgcs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cargoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICargo[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICargo[]>) => response.body)
      )
      .subscribe((res: ICargo[]) => (this.cargos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.accionDocService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAccionDoc[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAccionDoc[]>) => response.body)
      )
      .subscribe((res: IAccionDoc[]) => (this.acciondocs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ajustarDoc: IAjustarDoc) {
    this.editForm.patchValue({
      id: ajustarDoc.id,
      code: ajustarDoc.code,
      idUser: ajustarDoc.idUser,
      idCargo: ajustarDoc.idCargo,
      idAccion: ajustarDoc.idAccion,
      idDoc: ajustarDoc.idDoc,
      documentoSGC: ajustarDoc.documentoSGC,
      user: ajustarDoc.user,
      cargo: ajustarDoc.cargo,
      accionDoc: ajustarDoc.accionDoc
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ajustarDoc = this.createFromForm();
    if (ajustarDoc.id !== undefined) {
      this.subscribeToSaveResponse(this.ajustarDocService.update(ajustarDoc));
    } else {
      this.subscribeToSaveResponse(this.ajustarDocService.create(ajustarDoc));
    }
  }

  private createFromForm(): IAjustarDoc {
    const entity = {
      ...new AjustarDoc(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      idUser: this.editForm.get(['idUser']).value,
      idCargo: this.editForm.get(['idCargo']).value,
      idAccion: this.editForm.get(['idAccion']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      documentoSGC: this.editForm.get(['documentoSGC']).value,
      user: this.editForm.get(['user']).value,
      cargo: this.editForm.get(['cargo']).value,
      accionDoc: this.editForm.get(['accionDoc']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAjustarDoc>>) {
    result.subscribe((res: HttpResponse<IAjustarDoc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackCargoById(index: number, item: ICargo) {
    return item.id;
  }

  trackAccionDocById(index: number, item: IAccionDoc) {
    return item.id;
  }
}
