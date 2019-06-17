import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccionDoc } from 'app/shared/model/accion-doc.model';

@Component({
  selector: 'jhi-accion-doc-detail',
  templateUrl: './accion-doc-detail.component.html'
})
export class AccionDocDetailComponent implements OnInit {
  accionDoc: IAccionDoc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ accionDoc }) => {
      this.accionDoc = accionDoc;
    });
  }

  previousState() {
    window.history.back();
  }
}
