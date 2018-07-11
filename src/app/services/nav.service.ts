import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({providedIn: 'root'})

export class NavService {


  private messageSource = new BehaviorSubject('dashboard');
  currentMessage = this.messageSource.asObservable();

  private loadingSource = new BehaviorSubject(false);
  loading = this.loadingSource.asObservable();

  constructor() {
  }

  setTitle(message: string) {
    this.messageSource.next(message);
  }

  setLoading(loading: boolean) {
    this.loadingSource.next(loading);
  }

}
