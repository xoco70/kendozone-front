import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {NavService} from '../../services/nav.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  user: User;
  loading = false;
  avatar_src = 'assets/images/avatar/avatar.png';
  title: string;


  constructor(
    public auth: AuthenticationService,
    private nav: NavService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.title.subscribe(title => this.title = title);
      this.nav.loading.subscribe(loading => this.loading = loading);
    });
    const S3_URL_BASE = environment.s3UrlBase + '/avatar/';
    this.user = this.auth.currentUser();
    const avatar = this.user.avatar;
    if (avatar === null || avatar === undefined) {
      return;
    }
    if (avatar.startsWith('http')) {
      this.avatar_src = avatar;
      return;
    }
    this.avatar_src = S3_URL_BASE + avatar;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  logout(): void {
    this.auth.logout();
  }
}
