import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
export const TOKEN = 'jwt_token';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  login(email: string, password: string) {
    return this.http.post<any>('https://api.kz-api.test/auth/login', {email: email, password: password}, httpOptions)
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            // store email and jwt token in local storage to keep user logged in between page refreshes
            this.setToken(TOKEN);
            // const user = this.getTokenUser(TOKEN);
          }
        }));
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/login']);
  }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = jwtDecode.jwt_decode(token);
  //
  //   if (decoded.exp === undefined) {
  //     return null;
  //   }
  //
  //   const date = new Date(0);
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if (!token) {
  //     token = this.getToken();
  //   }
  //   if (!token) {
  //     return true;
  //   }
  //
  //   const date = this.getTokenExpirationDate(token);
  //   if (date === undefined) {
  //     return false;
  //   }
  //   return !(date.valueOf() > new Date().valueOf());
  // }
  //
  // getTokenUser(token: string): Date {
  //   const decoded = this.jwtDecode.jwt_decode(token);
  //
  //   if (decoded.exp === undefined) {
  //     return null;
  //   }
  //   token = decoded.exp;
  //   // const user = new User();
  //   // user.setUTCSeconds(decoded.exp);
  //   // return user;
  // }
  //

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }
}
