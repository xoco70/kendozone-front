import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService, TOKEN} from '../services/authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (!this.authService.isTokenExpired()) {
    //   return true;
    // }

    if (localStorage.getItem(TOKEN)) {
      // logged in so return true
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
