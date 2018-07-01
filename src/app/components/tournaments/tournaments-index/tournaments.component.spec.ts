import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentsComponent} from './tournaments.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterLinkDirectiveStub} from '../../../../testing/router-link-directive-stub';
import {By} from '@angular/platform-browser';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('TournamentsComponent', () => {
  let component: TournamentsComponent;
  let fixture: ComponentFixture<TournamentsComponent>;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];
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
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })],
      declarations: [TournamentsComponent,
        RouterLinkDirectiveStub],
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
    fixture = TestBed.createComponent(TournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
    // console.log(routerLinks);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
