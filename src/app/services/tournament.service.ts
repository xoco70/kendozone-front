import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {Tournament} from '../models/tournament';
import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from './local-storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})

export class TournamentService {
  tournamentsUrl = environment.apiUrl + 'tournaments/';
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

  store(tournament: Tournament): Observable<Tournament> {
    return this.http.post(this.tournamentsUrl, tournament, httpOptions).pipe(
      tap(data => this.toastr.success('model.tournament' + ' ' + 'action.created_successfully')),
      catchError(this.handleError<any>('createTournament'))
    );
  }

  update(tournament: Tournament, tab: string): Observable<any> {
    const tournamentUrl = this.tournamentsUrl + tournament.slug + '?tab=' + tab;
    // console.log(tournament);
    return this.http.put(tournamentUrl, tournament, httpOptions).pipe(
      tap(data => this.toastr.success('model.tournament' + ' ' + 'action.updated_successfully')),
      catchError(this.handleError<any>('updateTournament'))
    );
  }

  delete(tournament: Tournament): Observable<Tournament> {
    const slug = tournament.slug;
    const url = `${this.tournamentsUrl}${slug}`;
    return this.http.delete<any>(url, httpOptions)
      .pipe(
        tap(data => this.toastr.success('model.tournament' + ' ' + 'action.deleted_successfully')),
        catchError(this.handleError([]))
      );
  }

  statistics(tournamentSlug: string): Observable<any> {
    const listUrl = `${environment.apiUrl}tournaments/${tournamentSlug}/statistics/`;
    return this.http.get<any>(listUrl)
      .pipe(
        tap(stats => LocalStorageService.setTreesCount(stats.trees_count)),
        tap(stats => LocalStorageService.setTeamsCount(stats.teams_count)),
        tap(stats => LocalStorageService.setChampionshipsCount(stats.championships_count)),
        tap(stats => LocalStorageService.setCompetitorsCount(stats.competitors_count)),
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
      this.toastr.error(data.error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
