import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavService} from '../../../services/nav.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {ForgetPasswordService} from '../../../services/forget-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  token: string;

  constructor(
    private navbar: NavService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private forgetPass: ForgetPasswordService,
    private toastr: ToastrService) {
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      console.log(this.resetForm);
      this.submitted = false;
      return;
    }

    this.navbar.setLoading(true);
    this.forgetPass.reset(this.f.email.value, this.f.password.value, this.token)
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

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      token: [this.token, Validators.required]
    }, {validator: this.matchingPasswords('password', 'password_confirmation')});
    this.returnUrl = '/dashboard';
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }


}
