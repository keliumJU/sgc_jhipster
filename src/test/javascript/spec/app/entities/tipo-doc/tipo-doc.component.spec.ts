/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { TipoDocComponent } from 'app/entities/tipo-doc/tipo-doc.component';
import { TipoDocService } from 'app/entities/tipo-doc/tipo-doc.service';
import { TipoDoc } from 'app/shared/model/tipo-doc.model';

describe('Component Tests', () => {
  describe('TipoDoc Management Component', () => {
    let comp: TipoDocComponent;
    let fixture: ComponentFixture<TipoDocComponent>;
    let service: TipoDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [TipoDocComponent],
        providers: []
      })
        .overrideTemplate(TipoDocComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDocComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDocService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoDoc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
