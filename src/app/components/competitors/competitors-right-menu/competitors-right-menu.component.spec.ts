import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitorsRightMenuComponent} from './competitors-right-menu.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../services/authentication.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('CompetitorsRightMenuComponent', () => {
  let component: CompetitorsRightMenuComponent;
  let fixture: ComponentFixture<CompetitorsRightMenuComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      params: {},
      data: {},
      queryParams: {}
    }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorsRightMenuComponent ],
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
    fixture = TestBed.createComponent(CompetitorsRightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
