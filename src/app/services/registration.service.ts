import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class RegistrationService {
  constructor(
    private http: HttpClient) {
  }

  register(name: string, email: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/register', {name: name, email: email, password: password}, httpOptions);
  }
}
