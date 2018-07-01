import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthenticationService} from '../../../services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {By} from '@angular/platform-browser';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RegisterComponent', () => {
  let comp: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should render title in a h2 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('register.title_register');
  }));
  it(`should set submitted to true`, async(() => {
    comp.onSubmit();
    expect(comp.submitted).toBeTruthy();
  }));

  it(`should call the onSubmit method`, async(() => {
    spyOn(comp, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.onSubmit).toHaveBeenCalled();
  }));

  it(`form should be invalid without name`, async(() => {
    comp.registerForm.controls['name'].setValue('');
    comp.registerForm.controls['email'].setValue('asd@asd.com');
    comp.registerForm.controls['password'].setValue('text');
    comp.registerForm.controls['password_confirmation'].setValue('text');
    expect(comp.registerForm.valid).toBeFalsy();
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('div').textContent).toContain('validation.required');
    // expect(comp.registerForm.valid).toBeFalsy();
    // validation.required
  }));

  it(`form should be invalid without email`, async(() => {
    comp.registerForm.controls['name'].setValue('aada');
    comp.registerForm.controls['email'].setValue('');
    comp.registerForm.controls['password'].setValue('text');
    comp.registerForm.controls['password_confirmation'].setValue('text');
    expect(comp.registerForm.valid).toBeFalsy();
  }));

  it(`email should be valid email`, async(() => {
    comp.registerForm.controls['name'].setValue('aada');
    comp.registerForm.controls['email'].setValue('asdasd.com');
    comp.registerForm.controls['password'].setValue('text');
    comp.registerForm.controls['password_confirmation'].setValue('text');
    expect(comp.registerForm.valid).toBeFalsy();
  }));

  it(`form should be invalid without password`, async(() => {
    comp.registerForm.controls['name'].setValue('aada');
    comp.registerForm.controls['email'].setValue('asd@asd.com');
    comp.registerForm.controls['password'].setValue('');
    comp.registerForm.controls['password_confirmation'].setValue('text');
    expect(comp.registerForm.valid).toBeFalsy();
  }));

  it(`form should be invalid without password confirmation`, async(() => {
    comp.registerForm.controls['name'].setValue('aada');
    comp.registerForm.controls['email'].setValue('asd@asd.com');
    comp.registerForm.controls['password'].setValue('text');
    comp.registerForm.controls['password_confirmation'].setValue('');
    expect(comp.registerForm.valid).toBeFalsy();
  }));

  it(`login and password should have the same value`, async(() => {
    comp.registerForm.controls['name'].setValue('aada');
    comp.registerForm.controls['email'].setValue('asd@asd.com');
    comp.registerForm.controls['password'].setValue('text');
    comp.registerForm.controls['password_confirmation'].setValue('text2');
    expect(comp.registerForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.registerForm.controls['name'].setValue('aada');
    comp.registerForm.controls['email'].setValue('asd@asd.com');
    comp.registerForm.controls['password'].setValue('text');
    comp.registerForm.controls['password_confirmation'].setValue('text');
    expect(comp.registerForm.valid).toBeTruthy();
  }));
});
