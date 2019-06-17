import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProceso } from 'app/shared/model/proceso.model';

@Component({
  selector: 'jhi-proceso-detail',
  templateUrl: './proceso-detail.component.html'
})
export class ProcesoDetailComponent implements OnInit {
  proceso: IProceso;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ proceso }) => {
      this.proceso = proceso;
    });
  }

  previousState() {
    window.history.back();
  }
}
