import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISolRevision } from 'app/shared/model/sol-revision.model';

@Component({
  selector: 'jhi-sol-revision-detail',
  templateUrl: './sol-revision-detail.component.html'
})
export class SolRevisionDetailComponent implements OnInit {
  solRevision: ISolRevision;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ solRevision }) => {
      this.solRevision = solRevision;
    });
  }

  previousState() {
    window.history.back();
  }
}
