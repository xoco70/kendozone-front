declare var google: any;
import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Tournament} from '../../../../models/tournament';
import {TournamentService} from '../../../../services/tournament.service';
import {first} from 'rxjs/operators';
import {COUNTRIES} from '../../../../mock/mock-countries';
import { } from '@types/googlemaps';
import GeocoderRequest = google.maps.GeocoderRequest;

@Component({
  selector: 'app-tournament-edit-venue',
  templateUrl: './tournament-edit-venue.component.html',
  styleUrls: ['./tournament-edit-venue.component.scss']
})
export class TournamentEditVenueComponent implements OnInit {

  @Input() tournament: Tournament;
  loading = false;
  submitted = false;
  error = '';
  countries = COUNTRIES;
  public latitude: number;
  public longitude: number;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private tournamentService: TournamentService
  ) {
  }

  markerDragEnd(lat, lng, $event: MouseEvent) {
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    const geocoder = new google.maps.Geocoder();
    const request: GeocoderRequest = {
      location: new google.maps.LatLng(this.latitude, this.longitude)
    };

    geocoder.geocode(request, (results, status) => {
      this.ngZone.run(() => {
        this.tournament.venue.address = results[0].formatted_address;
      });
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    this.loading = true;
    this.tournament.venue.longitude = this.longitude + '';
    this.tournament.venue.latitude = this.latitude + '';
    this.tournamentService.update(this.tournament, 'venue')
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = parseFloat(this.tournament.venue.latitude);
    this.longitude = parseFloat(this.tournament.venue.longitude);
    // create search FormControl
    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.tournament.venue.address = place.formatted_address;
          this.tournament.venue.city = place.vicinity;
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

  private setCurrentPosition() {
    // If no registered location, set it to current browser position
    if ('geolocation' in navigator && this.latitude == null && this.longitude == null) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }


}
