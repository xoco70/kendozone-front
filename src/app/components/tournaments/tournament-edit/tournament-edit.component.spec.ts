import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentEditComponent} from './tournament-edit.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../services/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentService} from '../../../services/tournament.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

// const fakeActivatedRoute = {
//   snapshot: {
//     data: {},
//     queryParams: {
//       slug: 'fake-tournoi'
//     }
//   }
// } as ActivatedRoute;

describe('TournamentEditComponent', () => {
  let component: TournamentEditComponent;
  let fixture: ComponentFixture<TournamentEditComponent>;

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
      declarations: [ TournamentEditComponent ],
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
    fixture = TestBed.createComponent(TournamentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
