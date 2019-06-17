import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMacroProceso } from 'app/shared/model/macro-proceso.model';

@Component({
  selector: 'jhi-macro-proceso-detail',
  templateUrl: './macro-proceso-detail.component.html'
})
export class MacroProcesoDetailComponent implements OnInit {
  macroProceso: IMacroProceso;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ macroProceso }) => {
      this.macroProceso = macroProceso;
    });
  }

  previousState() {
    window.history.back();
  }
}
