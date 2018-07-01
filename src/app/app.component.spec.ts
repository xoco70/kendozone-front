import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {FooterComponent} from './components/footer/footer.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {RouterLinkDirectiveStub} from '../testing/router-link-directive-stub';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: MockRouter},
        ToastrService,
        AuthenticationService,
        JwtHelperService,
      ]

    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to kz-front!');
  // }));
});
