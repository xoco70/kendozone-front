import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {NavService} from '../../services/nav.service';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

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
    private nav: NavService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.title.subscribe(title => this.title = title);
      this.nav.loading.subscribe(loading => this.loading = loading);
    });
    this.avatar_src = this.userService.getAvatarUrl(this.auth.currentUser());
  }


  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
