import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICargo } from 'app/shared/model/cargo.model';

@Component({
  selector: 'jhi-cargo-detail',
  templateUrl: './cargo-detail.component.html'
})
export class CargoDetailComponent implements OnInit {
  cargo: ICargo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cargo }) => {
      this.cargo = cargo;
    });
  }

  previousState() {
    window.history.back();
  }
}
