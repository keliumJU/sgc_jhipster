import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAnexos } from 'app/shared/model/anexos.model';

@Component({
  selector: 'jhi-anexos-detail',
  templateUrl: './anexos-detail.component.html'
})
export class AnexosDetailComponent implements OnInit {
  anexos: IAnexos;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anexos }) => {
      this.anexos = anexos;
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
