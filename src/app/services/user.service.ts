import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class UserService {
  private usersUrl = environment.apiUrl + '/users/';


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  all(): Observable<User[]> {
    const listUrl = this.usersUrl;
    return this.http.get<User[]>(listUrl)
      .pipe(
        catchError(this.handleError('allUser', []))
      );
  }

  getUser(): Observable<User> {
    const listUrl = this.usersUrl + this.auth.currentUser().slug + '/edit';
    return this.http.get<any>(listUrl)
      .pipe(
        catchError(this.handleError('getUser', []))
      );
  }

  update(user: User): Observable<User> {
    const url = this.usersUrl + user.slug;
    return this.http.put<User>(url, user, httpOptions).pipe(
      tap(data => this.toastr.success('msg.profile_edited')),
      catchError(this.handleError<User>('generalDataProfile'))
    );
  }

  getAvatarUrl(user: User): string {
    const S3_URL_BASE = environment.s3UrlBase + '/avatar/';
    const avatar = user.avatar;
    if (avatar === null || avatar === undefined) {
      return;
    }
    if (avatar.startsWith('http')) {
      return avatar;
    }
    return S3_URL_BASE + avatar;
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
      return of(result as T);
    };
  }
}
