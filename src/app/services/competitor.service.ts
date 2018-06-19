import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Tournament} from '../models/tournament';
import {Competitor} from '../models/competitor';
import {Category} from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})

export class CompetitorService {


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  all(tournamentSlug: string): Observable<Tournament> {
    const listUrl = `${environment.apiUrl}/tournaments/${tournamentSlug}/competitors/`;
    return this.http.get<any>(listUrl)
      .pipe(
        catchError(this.handleError(['']))
      );
  }

  delete(tournamentSlug: string, competitor: Competitor): Observable<Competitor> {
    const url = `${environment.apiUrl}/tournaments/${tournamentSlug}/competitors/${competitor.id}`;
    return this.http.delete<any>(url, httpOptions)
      .pipe(
        tap(data => this.toastr.success('success')),
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

  store(competitors: Competitor[], championshipId: number): Observable<Competitor[]> {
    const competitorsUrl = `${environment.apiUrl}championships/${championshipId}/competitors/`;
    return this.http.post<any>(competitorsUrl, competitors, httpOptions).pipe(
      tap(data => this.toastr.success('success')),
      catchError(this.handleError<any>(''))
    );
  }
}
