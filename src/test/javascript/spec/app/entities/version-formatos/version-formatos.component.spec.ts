/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SgcTestModule } from '../../../test.module';
import { VersionFormatosComponent } from 'app/entities/version-formatos/version-formatos.component';
import { VersionFormatosService } from 'app/entities/version-formatos/version-formatos.service';
import { VersionFormatos } from 'app/shared/model/version-formatos.model';

describe('Component Tests', () => {
  describe('VersionFormatos Management Component', () => {
    let comp: VersionFormatosComponent;
    let fixture: ComponentFixture<VersionFormatosComponent>;
    let service: VersionFormatosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [VersionFormatosComponent],
        providers: []
      })
        .overrideTemplate(VersionFormatosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VersionFormatosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VersionFormatosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new VersionFormatos(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.versionFormatos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
