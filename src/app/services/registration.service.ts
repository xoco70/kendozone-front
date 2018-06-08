import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class RegistrationService {
  constructor(
    private http: HttpClient) {
  }

  register(name: string, email: string, password: string) {
    return this.http.post<any>('https://api.kz-api.test/register', {name: name, email: email, password: password}, httpOptions);
  }
}
