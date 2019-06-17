/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SgcTestModule } from '../../../test.module';
import { VersionFormatosDetailComponent } from 'app/entities/version-formatos/version-formatos-detail.component';
import { VersionFormatos } from 'app/shared/model/version-formatos.model';

describe('Component Tests', () => {
  describe('VersionFormatos Management Detail Component', () => {
    let comp: VersionFormatosDetailComponent;
    let fixture: ComponentFixture<VersionFormatosDetailComponent>;
    const route = ({ data: of({ versionFormatos: new VersionFormatos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SgcTestModule],
        declarations: [VersionFormatosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VersionFormatosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VersionFormatosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.versionFormatos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
