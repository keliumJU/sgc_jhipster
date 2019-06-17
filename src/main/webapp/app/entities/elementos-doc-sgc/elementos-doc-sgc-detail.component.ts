import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IElementosDocSGC } from 'app/shared/model/elementos-doc-sgc.model';

@Component({
  selector: 'jhi-elementos-doc-sgc-detail',
  templateUrl: './elementos-doc-sgc-detail.component.html'
})
export class ElementosDocSGCDetailComponent implements OnInit {
  elementosDocSGC: IElementosDocSGC;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ elementosDocSGC }) => {
      this.elementosDocSGC = elementosDocSGC;
    });
  }

  previousState() {
    window.history.back();
  }
}
