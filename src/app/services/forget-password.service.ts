import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class ForgetPasswordService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  reset(email: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'password/email', {email: email}, httpOptions)
      .pipe(
        tap(data => this.toastr.success('success')),
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
}
