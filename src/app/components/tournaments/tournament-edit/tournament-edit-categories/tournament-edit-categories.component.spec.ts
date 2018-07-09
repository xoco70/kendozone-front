import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentEditCategoriesComponent} from './tournament-edit-categories.component';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {NgbDatepickerModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TournamentService} from '../../../../services/tournament.service';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {Tournament} from '../../../../models/tournament';

describe('TournamentEditCategoriesComponent', () => {
  let comp: TournamentEditCategoriesComponent;
  let fixture: ComponentFixture<TournamentEditCategoriesComponent>;

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
      declarations: [TournamentEditCategoriesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        ToastrService,
        AuthenticationService,
        JwtHelperService,
        TournamentService,
        NgbModal,
        NgbModalStack
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditCategoriesComponent);
    comp = fixture.componentInstance;
    comp.tournament = new Tournament();
    comp.tournament.user_id = 1;
    comp.tournament.id = 1;
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

  // it('should create', () => {
  //   expect(comp).toBeTruthy();
  // });
});
