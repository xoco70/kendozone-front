import {Country} from './country';

export class Venue {
  id: number;
  venue_name: string;
  address: string;
  details: string;
  city: string;
  CP: string;
  state: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  country: Country;
}
