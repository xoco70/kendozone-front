import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {ForgetPasswordService} from '../../../services/forget-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;
  loading = true;
  email: string;

  constructor(private forgetPass: ForgetPasswordService) { }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.forgetPass.reset(this.email)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }
  ngOnInit() {
    this.loading = false;
  }

}
