import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Tournament} from '../../../../models/tournament';
import {TournamentService} from '../../../../services/tournament.service';
import {first} from 'rxjs/operators';
import {Venue} from '../../../../models/venue';
import {COUNTRIES} from '../../../../mock/mock-countries';


@Component({
  selector: 'app-tournament-edit-venue',
  templateUrl: './tournament-edit-venue.component.html',
  styleUrls: ['./tournament-edit-venue.component.scss']
})
export class TournamentEditVenueComponent implements OnInit {
  @Input() tournament: Tournament;
  private formGroup: FormGroup;
  public localTournament: Tournament = <Tournament>{};
  loading = false;
  submitted = false;
  error = '';
  countries = COUNTRIES;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private tournamentService: TournamentService
  ) {
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    // I use localTournament not to send the whole object
    // I still don't know if I have a Eloquent like in Angular
    this.localTournament.slug = this.tournament.slug;
    this.localTournament.venue = this.tournament.venue ? this.tournament.venue : new Venue();
    this.localTournament.venue.id = this.tournament.venue.id;
    this.localTournament.venue.venue_name = this.f.name.value;
    this.localTournament.venue.address = this.f.address.value;
    this.localTournament.venue.details = this.f.details.value;
    this.localTournament.venue.city = this.f.city.value;
    this.localTournament.venue.CP = this.f.CP.value;
    this.localTournament.venue.state = this.f.state.value;
    this.localTournament.venue.latitude = this.f.latitude.value;
    this.localTournament.venue.longitude = this.f.longitude.value;
    this.localTournament.venue.country_id = this.f.country_id.value;

    this.tournamentService.update(this.localTournament, 'venue')
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
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

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

    this.formGroup = this.formBuilder.group({
      name: [this.tournament.venue.venue_name, Validators.required],
      address: [this.tournament.venue.address],
      details: [this.tournament.venue.details],
      latitude: [this.latitude],
      longitude: [this.longitude],
      city: [this.tournament.venue.city],
      state: [this.tournament.venue.state],
      CP: [this.tournament.venue.CP],
      country_id: [this.tournament.venue.country_id],
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
