import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContenido } from 'app/shared/model/contenido.model';

@Component({
  selector: 'jhi-contenido-detail',
  templateUrl: './contenido-detail.component.html'
})
export class ContenidoDetailComponent implements OnInit {
  contenido: IContenido;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contenido }) => {
      this.contenido = contenido;
    });
  }

  previousState() {
    window.history.back();
  }
}
