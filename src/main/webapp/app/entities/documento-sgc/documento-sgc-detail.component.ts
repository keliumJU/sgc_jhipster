import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

@Component({
  selector: 'jhi-documento-sgc-detail',
  templateUrl: './documento-sgc-detail.component.html'
})
export class DocumentoSGCDetailComponent implements OnInit {
  documentoSGC: IDocumentoSGC;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ documentoSGC }) => {
      this.documentoSGC = documentoSGC;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
