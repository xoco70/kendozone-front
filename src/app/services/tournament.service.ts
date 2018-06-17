import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {Tournament} from '../models/tournament';
import {AuthenticationService} from './authentication.service';
import {ChampionshipSettings} from '../models/championship-settings';
import {ToastrService} from 'ngx-toastr';

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
    private toastr: ToastrService,
  ) {
  }

  all(page?: number): Observable<Tournament[]> {
    let listUrl = this.tournamentsUrl;
    if (page) {
      listUrl += '?page=' + page;
    }
    return this.http.get<Tournament[]>(listUrl)
      .pipe(
        catchError(this.handleError([]))
      );
  }

  getTournament(slug: string): Observable<Tournament> {
    const tournamentUrl = this.tournamentsUrl + slug + '/edit';
    return this.http.get<any>(tournamentUrl)
      .pipe(
        catchError(this.handleError([]))
      );
  }

  update(tournament: Tournament, tab: string): Observable<any> {
    const tournamentUrl = this.tournamentsUrl + tournament.slug + '?tab=' + tab;
    return this.http.put(tournamentUrl, tournament, httpOptions).pipe(
      tap(data => this.toastr.success('success')),
      catchError(this.handleError<any>('updateTournament'))
    );
  }

  delete(tournament: Tournament): Observable<Tournament> {
    const slug = tournament.slug;
    const url = `${this.tournamentsUrl}${slug}`;
    return this.http.delete<any>(url, httpOptions)
      .pipe(
        tap(data => this.toastr.success('success')),
        catchError(this.handleError([]))
      );
  }


  tournamentPresets(): Observable<ChampionshipSettings[]> {
    const listUrl = this.tournamentPresetsUrl;
    return this.http.get<ChampionshipSettings[]>(listUrl)
      .pipe(
        catchError(this.handleError([]))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (data: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.toastr.error(data.error.error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
