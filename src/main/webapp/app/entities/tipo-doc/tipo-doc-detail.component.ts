import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDoc } from 'app/shared/model/tipo-doc.model';

@Component({
  selector: 'jhi-tipo-doc-detail',
  templateUrl: './tipo-doc-detail.component.html'
})
export class TipoDocDetailComponent implements OnInit {
  tipoDoc: ITipoDoc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoDoc }) => {
      this.tipoDoc = tipoDoc;
    });
  }

  previousState() {
    window.history.back();
  }
}
