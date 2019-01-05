export class Venue {
  id: number;
  venue_name: string;
  address: string;
  details: string;
  city: string;
  latitude: string;
  longitude: string;
  country_id: number;


  constructor(venue_name: string, country_id: number,
              latitude?: string, longitude?: string, address?: string, city?: string, CP?: string) {
    this.venue_name = venue_name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.country_id = country_id;
    this.address = address;
    this.city = city;
  }
}
