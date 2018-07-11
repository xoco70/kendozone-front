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
  message: string;


  constructor(
    public auth: AuthenticationService,
    private data: NavService
  ) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.loading.subscribe(loading => this.loading = loading);
    const S3_BASE_URL = 'https://s3.amazonaws.com/kendozone-v2/avatar/';
    this.user = this.auth.currentUser();
    const avatar = this.user.avatar;
    console.log(this.user);
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

  // newMessage() {
  //   this.data.setTitle('Hello from Sibling');
  // }

}
