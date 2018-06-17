import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export const TOKEN = 'jwt_token';

@Injectable()
export class AuthenticationService {
  currentUser$: Subject<User> = new Subject<User>();
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
    return this.http.post<any>('https://api.kz-api.test/auth/login', {email: email, password: password}, httpOptions)
      .pipe(
        map((res: any) => {
          if (res && res.token) {
            this.setToken(res.token);
            this.currentUser();
            this.toastr.success('Welcome'); // user->name
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
      this.toastr.error(data.error.error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.currentUser$.next(undefined);
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
    const json = localStorage.getItem(TOKEN);
    const decoded = this.jwtHelper.decodeToken(json);
    if (decoded) {
      this.currentUser$.next(decoded.sub);
      return decoded.sub;
    }
    return null;
  }
}
