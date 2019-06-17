import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISolicitud, Solicitud } from 'app/shared/model/solicitud.model';
import { SolicitudService } from './solicitud.service';
import { IProceso } from 'app/shared/model/proceso.model';
import { ProcesoService } from 'app/entities/proceso';
import { ITipoDoc } from 'app/shared/model/tipo-doc.model';
import { TipoDocService } from 'app/entities/tipo-doc';
import { ITipoSolicitud } from 'app/shared/model/tipo-solicitud.model';
import { TipoSolicitudService } from 'app/entities/tipo-solicitud';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';

@Component({
  selector: 'jhi-solicitud-update',
  templateUrl: './solicitud-update.component.html'
})
export class SolicitudUpdateComponent implements OnInit {
  isSaving: boolean;

  procesos: IProceso[];

  tipodocs: ITipoDoc[];

  tiposolicituds: ITipoSolicitud[];

  documentosgcs: IDocumentoSGC[];
  fechaSolDp: any;

  editForm = this.fb.group({
    id: [],
    code: [],
    idProceso: [],
    idTipoDoc: [],
    idTipoSol: [],
    fechaSol: [],
    descripcion: [],
    idDoc: [],
    proceso: [],
    tipoDoc: [],
    tipoSolicitud: [],
    documentoSGC: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected solicitudService: SolicitudService,
    protected procesoService: ProcesoService,
    protected tipoDocService: TipoDocService,
    protected tipoSolicitudService: TipoSolicitudService,
    protected documentoSGCService: DocumentoSGCService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ solicitud }) => {
      this.updateForm(solicitud);
    });
    this.procesoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProceso[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProceso[]>) => response.body)
      )
      .subscribe((res: IProceso[]) => (this.procesos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoDocService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoDoc[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoDoc[]>) => response.body)
      )
      .subscribe((res: ITipoDoc[]) => (this.tipodocs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoSolicitudService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoSolicitud[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoSolicitud[]>) => response.body)
      )
      .subscribe((res: ITipoSolicitud[]) => (this.tiposolicituds = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentoSGCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentoSGC[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentoSGC[]>) => response.body)
      )
      .subscribe((res: IDocumentoSGC[]) => (this.documentosgcs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(solicitud: ISolicitud) {
    this.editForm.patchValue({
      id: solicitud.id,
      code: solicitud.code,
      idProceso: solicitud.idProceso,
      idTipoDoc: solicitud.idTipoDoc,
      idTipoSol: solicitud.idTipoSol,
      fechaSol: solicitud.fechaSol,
      descripcion: solicitud.descripcion,
      idDoc: solicitud.idDoc,
      proceso: solicitud.proceso,
      tipoDoc: solicitud.tipoDoc,
      tipoSolicitud: solicitud.tipoSolicitud,
      documentoSGC: solicitud.documentoSGC
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const solicitud = this.createFromForm();
    if (solicitud.id !== undefined) {
      this.subscribeToSaveResponse(this.solicitudService.update(solicitud));
    } else {
      this.subscribeToSaveResponse(this.solicitudService.create(solicitud));
    }
  }

  private createFromForm(): ISolicitud {
    const entity = {
      ...new Solicitud(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      idProceso: this.editForm.get(['idProceso']).value,
      idTipoDoc: this.editForm.get(['idTipoDoc']).value,
      idTipoSol: this.editForm.get(['idTipoSol']).value,
      fechaSol: this.editForm.get(['fechaSol']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      proceso: this.editForm.get(['proceso']).value,
      tipoDoc: this.editForm.get(['tipoDoc']).value,
      tipoSolicitud: this.editForm.get(['tipoSolicitud']).value,
      documentoSGC: this.editForm.get(['documentoSGC']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitud>>) {
    result.subscribe((res: HttpResponse<ISolicitud>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackProcesoById(index: number, item: IProceso) {
    return item.id;
  }

  trackTipoDocById(index: number, item: ITipoDoc) {
    return item.id;
  }

  trackTipoSolicitudById(index: number, item: ITipoSolicitud) {
    return item.id;
  }

  trackDocumentoSGCById(index: number, item: IDocumentoSGC) {
    return item.id;
  }
}
