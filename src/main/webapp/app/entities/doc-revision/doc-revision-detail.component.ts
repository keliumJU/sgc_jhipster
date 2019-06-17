import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocRevision } from 'app/shared/model/doc-revision.model';

@Component({
  selector: 'jhi-doc-revision-detail',
  templateUrl: './doc-revision-detail.component.html'
})
export class DocRevisionDetailComponent implements OnInit {
  docRevision: IDocRevision;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ docRevision }) => {
      this.docRevision = docRevision;
    });
  }

  previousState() {
    window.history.back();
  }
}
