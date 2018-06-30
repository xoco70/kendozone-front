import {inject, TestBed} from '@angular/core/testing';
import {TournamentService} from './tournament.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}


describe('TournamentService', () => {
  beforeEach(() => {
    const mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ToastrModule.forRoot(),
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
  });

  it('should be created', inject([TournamentService], (service: TournamentService) => {
    expect(service).toBeTruthy();
  }));
});
