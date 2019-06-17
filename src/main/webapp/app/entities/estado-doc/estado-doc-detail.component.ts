import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoDoc } from 'app/shared/model/estado-doc.model';

@Component({
  selector: 'jhi-estado-doc-detail',
  templateUrl: './estado-doc-detail.component.html'
})
export class EstadoDocDetailComponent implements OnInit {
  estadoDoc: IEstadoDoc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoDoc }) => {
      this.estadoDoc = estadoDoc;
    });
  }

  previousState() {
    window.history.back();
  }
}
