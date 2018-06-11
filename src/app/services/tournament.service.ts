import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {Tournament} from '../models/tournament';
import {AuthenticationService} from './authentication.service';
import {Championship} from '../models/championship';
import {ChampionshipSettings} from '../models/championship-settings';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class TournamentService {
  private tournamentsUrl = environment.apiUrl + 'tournaments/';
  private tournamentPresetsUrl = this.tournamentsUrl + 'presets';


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
  ) {
  }

  all(page?: number): Observable<Tournament[]> {
    let listUrl = this.tournamentsUrl;
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

  delete(tournament: Tournament): Observable<Tournament> {
    const slug = tournament.slug;
    const url = `${this.tournamentsUrl}/${slug}`;
    return this.http.delete<any>(url, httpOptions)
      .pipe(
        tap(tournaments => console.log(`deleted tournament slug=${slug}`)),
        catchError(this.handleError('all', []))
      );
  }

  tournamentPresets(): Observable<ChampionshipSettings[]> {
    const listUrl = this.tournamentPresetsUrl;
    console.log(listUrl);
    return this.http.get<ChampionshipSettings[]>(listUrl)
      .pipe(
        catchError(this.handleError('getTournamentPreets', []))
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
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getTournament(slug: string): Observable<Tournament> {
    const tournamentUrl = this.tournamentsUrl + slug + '/edit';
    return this.http.get<any>(tournamentUrl)
      .pipe(
        catchError(this.handleError('getTournament', []))
      );  }
}
