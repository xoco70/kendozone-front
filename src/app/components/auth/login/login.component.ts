import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {NavService} from '../../../services/nav.service';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private navbar: NavService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // sendEmail login status
    this.auth.logout();
    // if (this.route.snapshot.queryParams['welcome']) {
    //   setTimeout(() => {
    //     this.toastr.success('Register Successful, please login');
    //   });
    // }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '797477373695958',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = false;
      return;
    }

    this.navbar.setLoading(true);
    this.auth.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.navbar.setLoading(false);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.navbar.setLoading(false);
        });
  }

  ngAfterViewInit(): void {
    if (this.route.snapshot.queryParams['welcome']) {
      this.toastr.success('Register Successful, please login');
    }
  }

  fbLogin() {
    FB.login((response) => {
      if (response.authResponse) {
        this.getUserInfo(response.authResponse.userID, response.authResponse.accessToken);

      } else {
        this.toastr.error('Could not login with facebook');
        console.log(response.message);
      }
    });
  }

  getUserInfo(userId, accessToken) {
    FB.api(
      '/' + userId + '?fields=id,name,first_name,email,picture',
      (result) => {
        console.log('result===', result);
        if (result && !result.error) {
        }
      });
  }

  googleLogin() {

  }

}
