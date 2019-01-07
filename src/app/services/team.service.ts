import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Tournament} from '../models/tournament';
import {Championship} from '../models/championship';
import {Team} from '../models/team';
import {Competitor} from '../models/competitor';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})

export class TeamService {


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  store(championshipId: number, team: Team): Observable<any> {
    const generateTreeUrl = `${environment.apiUrl}/championships/${championshipId}/teams/`;
    return this.http.post<any>(generateTreeUrl, team, httpOptions).pipe(
      tap(() => this.toastr.success('success')),
      catchError(this.handleError<any>(''))
    );
  }

  addCompetitorToTeam(competitor: Competitor, team: Team) {
    const generateTreeUrl = `${environment.apiUrl}/teams/${team.id}/competitors/${competitor.id}/add`;
    return this.http.post<any>(generateTreeUrl, null, httpOptions).pipe(
      tap(() => this.toastr.success('success')),
      catchError(this.handleError<any>(''))
    );
  }

  removeCompetitorFromTeam(competitor: Competitor, team: Team) {
    const generateTreeUrl = `${environment.apiUrl}/teams/${team.id}/competitors/${competitor.id}/remove`;
    return this.http.post<any>(generateTreeUrl, null, httpOptions).pipe(
      tap(() => this.toastr.success('success')),
      catchError(this.handleError<any>(''))
    );
  }

  moveCompetitorFromTeam1toTeam2(competitor: Competitor, team1: Team, team2: Team) {
    const generateTreeUrl = `${environment.apiUrl}/teams/${team1.id}/${team2.id}/competitors/${competitor.id}/move`;
    return this.http.post<any>(generateTreeUrl, null, httpOptions).pipe(
      tap(() => this.toastr.success('success')),
      catchError(this.handleError<any>(''))
    );
  }


  delete(team: Team) {
    const generateTreeUrl = `${environment.apiUrl}/championships/${team.championship_id}/teams/${team.id}`;
    return this.http.delete<any>(generateTreeUrl, httpOptions).pipe(
      tap(() => this.toastr.success('success')),
      catchError(this.handleError<any>(''))
    );
  }

  getTournamentWithTeams(tournamentSlug: string): Observable<Tournament> {
    const listUrl = `${environment.apiUrl}/tournaments/${tournamentSlug}/teams/`;
    return this.http.get<any>(listUrl)
      .pipe(
        catchError(this.handleError(['']))
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
      if (data.error.msg === undefined) {
        this.toastr.error(data.error);
      } else {
        this.toastr.error(data.error.msg);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
