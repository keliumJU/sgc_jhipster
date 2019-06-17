import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IHistorialCambios } from 'app/shared/model/historial-cambios.model';

@Component({
  selector: 'jhi-historial-cambios-detail',
  templateUrl: './historial-cambios-detail.component.html'
})
export class HistorialCambiosDetailComponent implements OnInit {
  historialCambios: IHistorialCambios;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ historialCambios }) => {
      this.historialCambios = historialCambios;
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
