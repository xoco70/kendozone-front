import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService,
              private router: Router) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log(error.status);
            if (error.status === 400 || error.status === 401) {
              this.auth.collectFailedRequest(request);
              this.router.navigate(['/login']);
            }
          }
        }
      ),
    );
  }
}
