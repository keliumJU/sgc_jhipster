/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { ContenidoComponent } from 'app/entities/contenido/contenido.component';
import { ContenidoService } from 'app/entities/contenido/contenido.service';
import { Contenido } from 'app/shared/model/contenido.model';

describe('Component Tests', () => {
  describe('Contenido Management Component', () => {
    let comp: ContenidoComponent;
    let fixture: ComponentFixture<ContenidoComponent>;
    let service: ContenidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [ContenidoComponent],
        providers: []
      })
        .overrideTemplate(ContenidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContenidoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContenidoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Contenido(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contenidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
