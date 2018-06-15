import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './services/authentication.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loading = false;
  public currentUser: User;

  constructor(public translate: TranslateService,
              public auth: AuthenticationService) {

    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    this.currentUser = auth.currentUser();

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en/) ? browserLang : 'en');
  }

}
