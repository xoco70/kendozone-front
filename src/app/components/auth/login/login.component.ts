import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {NavService} from '../../../services/nav.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider, LinkedInLoginProvider
} from 'angularx-social-login';

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
    private toastr: ToastrService,
    private socialAuthService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.auth.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    // else if (socialPlatform === 'linkedin') {
    //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    // }
    this.navbar.setLoading(true);
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.auth.socialLogin(userData).subscribe((data) => {
          this.navbar.setLoading(false);
          this.router.navigate([this.returnUrl]);
        });

      }
    );
  }
}
