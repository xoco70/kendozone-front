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
  let component: TournamentEditGeneralComponent;
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
    component = fixture.componentInstance;
    component.tournament = new Tournament();
    component.tournament.user_id = 1;
    component.tournament.name = 'My Tournament';
    component.tournament.dateIni = '2017-08-08';
    component.tournament.dateFin = '2017-08-08';
    component.tournament.registerDateLimit = '2017-08-08';
    component.tournament.user_id = 1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
