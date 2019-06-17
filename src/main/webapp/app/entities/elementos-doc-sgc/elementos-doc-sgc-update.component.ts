import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IElementosDocSGC, ElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';
import { ElementosDocSGCService } from './elementos-doc-sgc.service';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { DocumentoSGCService } from 'app/entities/documento-sgc';
import { IElementos } from 'app/shared/model/elementos.model';
import { ElementosService } from 'app/entities/elementos';

@Component({
  selector: 'jhi-elementos-doc-sgc-update',
  templateUrl: './elementos-doc-sgc-update.component.html'
})
export class ElementosDocSGCUpdateComponent implements OnInit {
  isSaving: boolean;

  documentosgcs: IDocumentoSGC[];

  elementos: IElementos[];

  editForm = this.fb.group({
    id: [],
    idElemento: [],
    idDoc: [],
    valor: [],
    documentoDocSGC: [],
    elementos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected elementosDocSGCService: ElementosDocSGCService,
    protected documentoSGCService: DocumentoSGCService,
    protected elementosService: ElementosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ elementosDocSGC }) => {
      this.updateForm(elementosDocSGC);
    });
    this.documentoSGCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentoSGC[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentoSGC[]>) => response.body)
      )
      .subscribe((res: IDocumentoSGC[]) => (this.documentosgcs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.elementosService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IElementos[]>) => mayBeOk.ok),
        map((response: HttpResponse<IElementos[]>) => response.body)
      )
      .subscribe((res: IElementos[]) => (this.elementos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(elementosDocSGC: IElementosDocSGC) {
    this.editForm.patchValue({
      id: elementosDocSGC.id,
      idElemento: elementosDocSGC.idElemento,
      idDoc: elementosDocSGC.idDoc,
      valor: elementosDocSGC.valor,
      documentoDocSGC: elementosDocSGC.documentoDocSGC,
      elementos: elementosDocSGC.elementos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const elementosDocSGC = this.createFromForm();
    if (elementosDocSGC.id !== undefined) {
      this.subscribeToSaveResponse(this.elementosDocSGCService.update(elementosDocSGC));
    } else {
      this.subscribeToSaveResponse(this.elementosDocSGCService.create(elementosDocSGC));
    }
  }

  private createFromForm(): IElementosDocSGC {
    const entity = {
      ...new ElementosDocSGC(),
      id: this.editForm.get(['id']).value,
      idElemento: this.editForm.get(['idElemento']).value,
      idDoc: this.editForm.get(['idDoc']).value,
      valor: this.editForm.get(['valor']).value,
      documentoDocSGC: this.editForm.get(['documentoDocSGC']).value,
      elementos: this.editForm.get(['elementos']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IElementosDocSGC>>) {
    result.subscribe((res: HttpResponse<IElementosDocSGC>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackElementosById(index: number, item: IElementos) {
    return item.id;
  }
}
