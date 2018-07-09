import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentEditVenueComponent} from './tournament-edit-venue.component';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentService} from '../../../../services/tournament.service';
import {AuthenticationService} from '../../../../services/authentication.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Tournament} from '../../../../models/tournament';
import {Venue} from '../../../../models/venue';


export class MockMapsAPILoader {
  public load(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}

describe('TournamentEditVenueComponent', () => {
  let comp: TournamentEditVenueComponent;
  let fixture: ComponentFixture<TournamentEditVenueComponent>;
  let form;
  let testForm;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  const fakeActivatedRoute = {
    snapshot: {
      data: {},
      queryParams: {}
    }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbDatepickerModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      declarations: [TournamentEditVenueComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
        ToastrService,
        AuthenticationService,
        JwtHelperService,
        TournamentService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditVenueComponent);

    comp = fixture.componentInstance;

    form = comp.ngForm.form;
    comp.tournament = new Tournament();
    comp.tournament.user_id = 1;
    comp.tournament.name = 'My Tournament';
    comp.tournament.dateIni = '2017-08-08';
    comp.tournament.dateFin = '2017-08-08';
    comp.tournament.venue = new Venue();

    // testForm = <NgForm>{
    //   value: {
    //     venue_name: 'my Name',
    //     address: '123 rue de paris',
    //     details: 'Details',
    //     country_id: '484',
    //     latitude: '0.12345',
    //     longitude: '1.12345',
    //   },
    //   valid: true
    // };

    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(testForm.valid).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  // fit('should be invalid without name', () => {
  //   testForm.value.venue_name = '';
  //   expect(testForm.valid).toBeFalsy();
  // });
});
