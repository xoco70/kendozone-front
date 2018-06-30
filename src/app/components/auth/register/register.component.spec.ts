import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthenticationService} from '../../../services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      declarations: [RegisterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        ToastrService,
        AuthenticationService,
        JwtHelperService,
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
