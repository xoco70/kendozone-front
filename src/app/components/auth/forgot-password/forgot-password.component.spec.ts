import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotPasswordComponent} from './forgot-password.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ToastrModule, ToastrService} from 'ngx-toastr';


class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    const mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        FormsModule,
        HttpClientModule],
      declarations: [ForgotPasswordComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: MockRouter},
        ToastrService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
