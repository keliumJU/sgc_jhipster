import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFormatos } from 'app/shared/model/formatos.model';

@Component({
  selector: 'jhi-formatos-detail',
  templateUrl: './formatos-detail.component.html'
})
export class FormatosDetailComponent implements OnInit {
  formatos: IFormatos;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formatos }) => {
      this.formatos = formatos;
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
