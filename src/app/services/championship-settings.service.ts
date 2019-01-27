import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {ChampionshipSettings} from '../models/championship-settings';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class ChampionshipSettingsService {


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  store(settings: ChampionshipSettings): Observable<ChampionshipSettings> {
    const url = environment.apiUrl + '/championships/' + settings.championship_id + '/settings/';
    return this.http.post<ChampionshipSettings>(url, settings, httpOptions).pipe(
      tap(data => {
        this.toastr.success('msg.settings_create_success');
      }),
      catchError(this.handleError<ChampionshipSettings>('addChampionshipSettings'))
    );
  }

  update(championshipId: number, settings: ChampionshipSettings): Observable<ChampionshipSettings> {
    const url = environment.apiUrl + '/championships/' + championshipId + '/settings/' + settings.id;
    return this.http.put<ChampionshipSettings>(url, settings, httpOptions).pipe(
      tap(data => this.toastr.success('msg.settings_update_success')),
      catchError(this.handleError<ChampionshipSettings>('updateChampionshipSettings'))
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
      return of(result as T);
    };
  }


}
