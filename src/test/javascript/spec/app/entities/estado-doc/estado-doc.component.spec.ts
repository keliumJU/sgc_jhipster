/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { EstadoDocComponent } from 'app/entities/estado-doc/estado-doc.component';
import { EstadoDocService } from 'app/entities/estado-doc/estado-doc.service';
import { EstadoDoc } from 'app/shared/model/estado-doc.model';

describe('Component Tests', () => {
  describe('EstadoDoc Management Component', () => {
    let comp: EstadoDocComponent;
    let fixture: ComponentFixture<EstadoDocComponent>;
    let service: EstadoDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [EstadoDocComponent],
        providers: []
      })
        .overrideTemplate(EstadoDocComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoDocComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoDocService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstadoDoc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
