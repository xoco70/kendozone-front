import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ForgetPasswordService} from '../../../services/forget-password.service';
import {NavService} from '../../../services/nav.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;
  email: string;
  @Input() loading;

  constructor(private navbar: NavService,
              private forgetPass: ForgetPasswordService) {
  }

  onSubmit() {
    this.submitted = true;
    this.navbar.setLoading(true);

    this.forgetPass.reset(this.email)
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
  }

}
