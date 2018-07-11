import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './services/authentication.service';
import {User} from './models/user';
import 'reflect-metadata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentUser: User;

  constructor(public translate: TranslateService,
              public auth: AuthenticationService) {

    translate.addLangs(['en']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.currentUser = this.auth.currentUser();
  }
}
