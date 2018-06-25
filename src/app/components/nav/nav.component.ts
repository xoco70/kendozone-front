import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: User;

  constructor(
    public auth: AuthenticationService,
  ) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.auth.logout();
  }

}
