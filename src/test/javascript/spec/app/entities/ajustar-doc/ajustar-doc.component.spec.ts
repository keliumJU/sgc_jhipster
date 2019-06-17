/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { AjustarDocComponent } from 'app/entities/ajustar-doc/ajustar-doc.component';
import { AjustarDocService } from 'app/entities/ajustar-doc/ajustar-doc.service';
import { AjustarDoc } from 'app/shared/model/ajustar-doc.model';

describe('Component Tests', () => {
  describe('AjustarDoc Management Component', () => {
    let comp: AjustarDocComponent;
    let fixture: ComponentFixture<AjustarDocComponent>;
    let service: AjustarDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [AjustarDocComponent],
        providers: []
      })
        .overrideTemplate(AjustarDocComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AjustarDocComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AjustarDocService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AjustarDoc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ajustarDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
