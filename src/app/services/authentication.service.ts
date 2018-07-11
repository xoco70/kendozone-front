import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {LocalStorageService} from './local-storage.service';
import {User} from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export const TOKEN = 'jwt_token';

@Injectable()
export class AuthenticationService {
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService
  ) {
  }

  static tokenGetter(): string {
    return localStorage.getItem(TOKEN);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'auth/login', {email: email, password: password}, httpOptions)
      .pipe(
        map((res: any) => {
          if (res && res.token) {
            LocalStorageService.setUser(res.user);
            this.setToken(res.token);
            this.currentUser();
            this.toastr.success('login.welcome'); // user->name
          }
        }),
        catchError(this.handleError('login', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (data: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.toastr.error(data.error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout() {
    localStorage.removeItem(TOKEN);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  public currentUser(): User {
    const json = localStorage.getItem('user');
    if (json !== null) {
      return JSON.parse(json);

    }
  }
}
