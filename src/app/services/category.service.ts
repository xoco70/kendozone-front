import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

import {AuthenticationService} from './authentication.service';
import {Category} from '../models/category';
import {ToastrService} from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class CategoryService {
  private categoriesUrl = environment.apiUrl + 'categories';


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  all(): Observable<Category[]> {
    const listUrl = this.categoriesUrl;
    return this.http.get<Category[]>(listUrl)
      .pipe(
        tap(data => this.toastr.success('success')),
        catchError(this.handleError('allCategories', []))
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

  store(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions).pipe(
      tap(data => this.toastr.success('success')),
      catchError(this.handleError<Category>('addCategory'))
    );
  }
}
