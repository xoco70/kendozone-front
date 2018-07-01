import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {TournamentService} from './tournament.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../../environments/environment';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}


describe('TournamentService', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let tournamentSrv: TournamentService;

  beforeEach(() => {
    const mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })],
      providers: [
        TournamentService,
        AuthenticationService,
        ToastrService,
        JwtHelperService,
        {provide: Router, useClass: MockRouter}
      ]
    });
    injector = getTestBed();
    tournamentSrv = injector.get(TournamentService);
    httpMock = injector.get(HttpTestingController);
    // console.log(httpMock);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([TournamentService], (service: TournamentService) => {
    expect(service).toBeTruthy();
  }));

  describe('#all', () => {
    it('should return an Observable<Tournament[]>', () => {
      const dummyTournaments = {
        data: [
          {
            id: 1,
            name: 'Fake Tournoi',
            user: 'superuser@kendozone.dev',
            date: '2018-06-21',
            slug: 'fake-tournoi',
            competitors_count: 3,
            venue_id: 1
          },
          {
            id: 3,
            name: 'Prof. Sidney Cassin',
            user: 'club@kendozone.dev',
            date: '2018-06-26',
            slug: 'voluptatem-impedit-expedita-repellat-saepe-occaecati-atque',
            competitors_count: 2,
            venue_id: 2
          }
        ],
        links: [{
          first: 'https://api.kz-api.test/tournaments?page=1',
          last: 'https://api.kz-api.test/tournaments?page=1',
          next: null,
          prev: null
        }],
        meta: {current_page: 1, from: 1, last_page: 1, path: 'https://api.kz-api.test/tournaments', per_page: 25, to: 2, total: 2}
      };

      tournamentSrv.all().subscribe(tournaments => {
        // const data = tournaments['data'];
        // expect(data.length).toBe(2);
        // expect(tournaments).toEqual(dummyTournaments);
      });

      const url1 = `${environment.apiUrl}tournaments`;
      const url2 = `${tournamentSrv.tournamentsUrl}`;
      console.log(url1);
      console.log(url2);
      // const req = httpMock.expectOne(`${environment.apiUrl}tournaments`);
      const req = httpMock.expectOne({method: 'GET', url: 'https://api.kz-api.test/tournaments/'});
      req.flush(dummyTournaments);
    });
  });
});
