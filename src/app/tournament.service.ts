import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';

import {Tournament} from './tournament';
import {TOURNAMENTS} from './mock/mock-tournaments';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournamentsUrl = 'https://api.kz-api.test/tournaments';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getTournaments(): Observable<Tournament[]> {
    this.messageService.add('TournamentService: fetched tournaments');
    return this.http.get<Tournament[]>(this.tournamentsUrl)
      .pipe(
        tap(tournaments => this.log(`fetched tournaments`)),
        catchError(this.handleError('getTournaments', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getTournament(id: number): Observable<Tournament> {
    const url = `${this.tournamentsUrl}/${id}`;
    return this.http.get<Tournament>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Tournament>(`getHero id=${id}`))
    );
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
