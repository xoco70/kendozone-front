import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: User;
  loading = false;
  avatar_src = 'assets/images/avatar/avatar.png';
  title: string;


  constructor(
    public auth: AuthenticationService,
    private nav: NavService
  ) {
  }

  ngOnInit() {
    this.nav.title.subscribe(title => this.title = title);
    this.nav.loading.subscribe(loading => this.loading = loading);
    const S3_BASE_URL = 'https://s3.amazonaws.com/kendozone-v2/avatar/';
    this.user = this.auth.currentUser();
    const avatar = this.user.avatar;
    if (avatar === null || avatar === undefined) {
      return;
    }
    if (avatar.startsWith('http')) {
      this.avatar_src = avatar;
      return;
    }
    this.avatar_src = S3_BASE_URL + avatar;
  }

  logout(): void {
    this.auth.logout();
  }
}
