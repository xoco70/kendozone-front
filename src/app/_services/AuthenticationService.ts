import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<any>('https://api.kz-api.test/auth/login', {email: email, password: password})
      .pipe(
        map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // store email and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({email, token: res.token}));
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
