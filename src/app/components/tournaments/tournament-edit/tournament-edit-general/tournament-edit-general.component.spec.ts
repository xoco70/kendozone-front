import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentEditGeneralComponent} from './tournament-edit-general.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication.service';
import {TournamentService} from '../../../../services/tournament.service';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {Tournament} from '../../../../models/tournament';

describe('TournamentEditGeneralComponent', () => {
  let comp: TournamentEditGeneralComponent;
  let fixture: ComponentFixture<TournamentEditGeneralComponent>;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  const fakeActivatedRoute = {
    snapshot: {
      data: {},
      queryParams: {}
    }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbDatepickerModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      declarations: [TournamentEditGeneralComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        ToastrService,
        AuthenticationService,
        JwtHelperService,
        TournamentService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditGeneralComponent);
    comp = fixture.componentInstance;
    comp.tournament = new Tournament();
    comp.tournament.user_id = 1;
    comp.tournament.name = 'My Tournament';
    comp.tournament.dateIni = '2017-08-08';
    comp.tournament.dateFin = '2017-08-08';
    comp.tournament.registerDateLimit = '2017-08-08';
    comp.tournament.user_id = 1;
    comp.tournament.promoter = 'text';
    comp.tournament.host_organization = 'text';
    comp.tournament.technical_assistance = 'text';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it(`form should be invalid without name`, async(() => {
    comp.form.controls['name'].setValue('');
    expect(comp.form.valid).toBeFalsy();
  }));

  it(`form should be invalid without dateIni`, async(() => {
    comp.form.controls['dateIni'].setValue('');
    expect(comp.form.valid).toBeFalsy();
  }));

  it(`form should be invalid with bad dateIni`, async(() => {
    comp.form.controls['dateIni'].setValue('123456');
    expect(comp.form.valid).toBeFalsy();
  }));

  it(`form should be invalid without dateFin`, async(() => {
    comp.form.controls['dateFin'].setValue('');
    expect(comp.form.valid).toBeFalsy();
  }));

  it(`form should be invalid with bad dateFin`, async(() => {
    comp.form.controls['dateFin'].setValue('123456');
    expect(comp.form.valid).toBeFalsy();
  }));

  it(`form should be invalid without registerDateLimit`, async(() => {
    comp.form.controls['registerDateLimit'].setValue('');
    expect(comp.form.valid).toBeFalsy();
  }));

  it(`form should be invalid with bad registerDateLimit`, async(() => {
    comp.form.controls['registerDateLimit'].setValue('123456');
    expect(comp.form.valid).toBeFalsy();
  }));

  it(`form should be valid with all params set`, async(() => {
    expect(comp.form.valid).toBeTruthy();
  }));
});
