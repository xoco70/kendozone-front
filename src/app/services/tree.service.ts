import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Tournament} from '../models/tournament';
import {Championship} from '../models/championship';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})

export class TreeService {


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  store(championship: Championship): Observable<any> {
    const generateTreeUrl = `${environment.apiUrl}/championships/${championship.id}/trees/`;
    return this.http.post<any>(generateTreeUrl, championship, httpOptions).pipe(
      tap(() => this.toastr.success('msg.championships_tree_generation_success')),
      catchError(this.handleError<any>(''))
    );
  }

  getTournamentWithTrees(tournamentSlug: string): Observable<Tournament> {
    const listUrl = `${environment.apiUrl}/tournaments/${tournamentSlug}/trees/`;
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
      // console.log(data);
      // TODO: send the error to remote logging infrastructure
      this.toastr.error(data.error.msg);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
