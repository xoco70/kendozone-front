import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({providedIn: 'root'})

export class NavService {


  private titleSource = new BehaviorSubject('Kendozone');
  title = this.titleSource.asObservable();

  private loadingSource = new BehaviorSubject(true);
  loading = this.loadingSource.asObservable();

  constructor() {
  }

  setTitle(title: string) {
    this.titleSource.next(title);
  }

  setLoading(loading: boolean) {
    this.loadingSource.next(loading);
  }

}
