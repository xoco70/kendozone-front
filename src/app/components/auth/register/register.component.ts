import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../../../services/registration.service';
import {ToastrService} from 'ngx-toastr';
import {PasswordValidation} from '../../../validation/password-validation';
import {NavService} from '../../../services/nav.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private navbar: NavService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
      },
      {
        validator: PasswordValidation.MatchPassword
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.navbar.setLoading(true);
    this.registrationService.register(this.f.name.value, this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
          this.submitted = true;
          this.navbar.setLoading(false);
          this.toastr.success('check your mail');
        },
        error => {
          console.log(error.error);
          this.error = error;
          this.submitted = true;
          this.navbar.setLoading(false);
          this.toastr.error('error 500');
        });
  }

}
