import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
export const TOKEN = 'jwt_token';

@Injectable({providedIn: 'root'})

export class RegistrationService {
  private message: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router) {
  }

  register(name: string, email: string, password: string) {
    return this.http.post<any>('https://api.kz-api.test/register', {name: name, email: email, password: password}, httpOptions)
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          this.message = res.message;
        }),
        tap(() => this.log(this.message)), // TODO Should improve it with conditional styling
        catchError(this.handleError('register', []))
      );
  }

  // TODO method log is duplicated
  private log(message: string) {
    this.messageService.add(message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
