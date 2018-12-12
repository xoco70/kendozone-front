import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ForgetPasswordService} from '../../../services/forget-password.service';
import {NavService} from '../../../services/nav.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  sendPasswordForm: FormGroup;
  submitted = false;
  email: string;
  @Input() loading;

  constructor(private navbar: NavService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private forgetPass: ForgetPasswordService) {
  }

  get f() {
    return this.sendPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.sendPasswordForm.invalid) {
      this.navbar.setLoading(false);
      return;
    }
    this.forgetPass.reset(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          this.navbar.setLoading(false);
        },
        error => {
          this.navbar.setLoading(false);
        });
  }

  ngOnInit() {
    this.navbar.setLoading(false);
    this.sendPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

}
