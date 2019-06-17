import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoSolicitud } from 'app/shared/model/tipo-solicitud.model';

@Component({
  selector: 'jhi-tipo-solicitud-detail',
  templateUrl: './tipo-solicitud-detail.component.html'
})
export class TipoSolicitudDetailComponent implements OnInit {
  tipoSolicitud: ITipoSolicitud;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoSolicitud }) => {
      this.tipoSolicitud = tipoSolicitud;
    });
  }

  previousState() {
    window.history.back();
  }
}
