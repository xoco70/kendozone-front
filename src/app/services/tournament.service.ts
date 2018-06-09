import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';

import {Tournament} from '../models/tournament';
import {AuthenticationService} from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class TournamentService {
  private listUrl = 'https://api.kz-api.test/tournaments';
  private deleteUrl = 'https://api.kz-api.test/tournaments/:slug/';


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
  ) {
  }

  all(page?: number): Observable<Tournament[]> {
    let listUrl = this.listUrl;
    if (page) {
      listUrl += '?page=' + page;
    }
    console.log(listUrl);
    return this.http.get<Tournament[]>(listUrl)
      .pipe(
        tap(tournaments => console.log(`fetched tournaments`)),
        catchError(this.handleError('all', []))
      );
  }

  delete(tournament: Tournament | string): Observable<Tournament> {
    return null;
    // const slug = typeof tournament === 'string' ? tournament : tournament.slug;
    // const url = `${this.listUrl}/${slug}`;
    // console.log('url:' + url);
    // return this.http.delete<Tournament>(url, httpOptions)
    //   .pipe(
    //     tap(tournaments => console.log(`deleted hero slug=${slug}`)),
    //     catchError(this.handleError('all', []))
    //   );
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
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
