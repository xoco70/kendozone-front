import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitorsComponent} from './competitors.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SlugPipe} from '../../pipes/slug.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('CompetitorsComponent', () => {
  let component: CompetitorsComponent;
  let fixture: ComponentFixture<CompetitorsComponent>;
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
      declarations: [CompetitorsComponent, SlugPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        ToastrService,
        AuthenticationService,
        JwtHelperService,
        NgbModal,
        NgbModalStack
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
