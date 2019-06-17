import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDocRevision, DocRevision } from 'app/shared/model/doc-revision.model';
import { DocRevisionService } from './doc-revision.service';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-doc-revision-update',
  templateUrl: './doc-revision-update.component.html'
})
export class DocRevisionUpdateComponent implements OnInit {
  isSaving: boolean;

  documentosgcs: IDocumentoSGC[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    code: [],
    idUser: [],
    idDoc: [],
    comentario1: [],
    comentario2: [],
    documentoSGC: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected docRevisionService: DocRevisionService,
    protected documentoSGCService: DocumentoSGCService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ docRevision }) => {
      this.updateForm(docRevision);
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
  }

  updateForm(docRevision: IDocRevision) {
    this.editForm.patchValue({
      id: docRevision.id,
      code: docRevision.code,
      idUser: docRevision.idUser,
      idDoc: docRevision.idDoc,
      comentario1: docRevision.comentario1,
      comentario2: docRevision.comentario2,
      documentoSGC: docRevision.documentoSGC,
      user: docRevision.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const docRevision = this.createFromForm();
    if (docRevision.id !== undefined) {
      this.subscribeToSaveResponse(this.docRevisionService.update(docRevision));
    } else {
      this.subscribeToSaveResponse(this.docRevisionService.create(docRevision));
    }
  }

  private createFromForm(): IDocRevision {
    const entity = {
      ...new DocRevision(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      idUser: this.editForm.get(['idUser']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      comentario1: this.editForm.get(['comentario1']).value,
      comentario2: this.editForm.get(['comentario2']).value,
      documentoSGC: this.editForm.get(['documentoSGC']).value,
      user: this.editForm.get(['user']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocRevision>>) {
    result.subscribe((res: HttpResponse<IDocRevision>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
