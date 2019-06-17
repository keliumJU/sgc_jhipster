import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IVersionFormatos } from 'app/shared/model/version-formatos.model';

@Component({
  selector: 'jhi-version-formatos-detail',
  templateUrl: './version-formatos-detail.component.html'
})
export class VersionFormatosDetailComponent implements OnInit {
  versionFormatos: IVersionFormatos;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ versionFormatos }) => {
      this.versionFormatos = versionFormatos;
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
