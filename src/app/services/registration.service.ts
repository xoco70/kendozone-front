import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
export const TOKEN = 'jwt_token';

@Injectable()
export class RegistrationService {

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  register(name: string, email: string, password: string) {
    return this.http.post<any>('https://api.kz-api.test/register', {name: name, email: email, password: password}, httpOptions)
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            // store email and jwt token in local storage to keep user logged in between page refreshes
          }
        }));
  }
}
