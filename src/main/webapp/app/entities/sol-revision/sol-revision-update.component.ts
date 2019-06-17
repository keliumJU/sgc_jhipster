import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISolRevision, SolRevision } from 'app/shared/model/sol-revision.model';
import { SolRevisionService } from './sol-revision.service';
import { IUser, UserService } from 'app/core';
import { ISolicitud } from 'app/shared/model/solicitud.model';
import { SolicitudService } from 'app/entities/solicitud';

@Component({
  selector: 'jhi-sol-revision-update',
  templateUrl: './sol-revision-update.component.html'
})
export class SolRevisionUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  solicituds: ISolicitud[];

  editForm = this.fb.group({
    id: [],
    code: [],
    idUser: [],
    idSol: [],
    estado: [],
    user: [],
    solicitud: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected solRevisionService: SolRevisionService,
    protected userService: UserService,
    protected solicitudService: SolicitudService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ solRevision }) => {
      this.updateForm(solRevision);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.solicitudService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISolicitud[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISolicitud[]>) => response.body)
      )
      .subscribe((res: ISolicitud[]) => (this.solicituds = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(solRevision: ISolRevision) {
    this.editForm.patchValue({
      id: solRevision.id,
      code: solRevision.code,
      idUser: solRevision.idUser,
      idSol: solRevision.idSol,
      estado: solRevision.estado,
      user: solRevision.user,
      solicitud: solRevision.solicitud
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const solRevision = this.createFromForm();
    if (solRevision.id !== undefined) {
      this.subscribeToSaveResponse(this.solRevisionService.update(solRevision));
    } else {
      this.subscribeToSaveResponse(this.solRevisionService.create(solRevision));
    }
  }

  private createFromForm(): ISolRevision {
    const entity = {
      ...new SolRevision(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      idUser: this.editForm.get(['idUser']).value,
      idSol: this.editForm.get(['idSol']).value,
      estado: this.editForm.get(['estado']).value,
      user: this.editForm.get(['user']).value,
      solicitud: this.editForm.get(['solicitud']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolRevision>>) {
    result.subscribe((res: HttpResponse<ISolRevision>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackSolicitudById(index: number, item: ISolicitud) {
    return item.id;
  }
}
