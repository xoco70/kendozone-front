import {Injectable} from '@angular/core';
import {Country} from '../models/country';
import {COUNTRIES} from '../mock/mock-countries';

@Injectable({providedIn: 'root'})

export class CountryService {

  static all(): Country[] {

    return COUNTRIES;
  }


}
