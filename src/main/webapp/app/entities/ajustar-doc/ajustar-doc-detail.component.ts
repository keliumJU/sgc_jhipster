import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAjustarDoc } from 'app/shared/model/ajustar-doc.model';

@Component({
  selector: 'jhi-ajustar-doc-detail',
  templateUrl: './ajustar-doc-detail.component.html'
})
export class AjustarDocDetailComponent implements OnInit {
  ajustarDoc: IAjustarDoc;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ajustarDoc }) => {
      this.ajustarDoc = ajustarDoc;
    });
  }

  previousState() {
    window.history.back();
  }
}
