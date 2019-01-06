import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TournamentsComponent} from './components/tournaments/tournaments-index/tournaments.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavComponent} from './components/nav/nav.component';
import {TournamentCreateComponent} from './components/tournaments/tournament-create/tournament-create.component';
import {TournamentEditComponent} from './components/tournaments/tournament-edit/tournament-edit.component';
import {TournamentEditGeneralComponent} from './components/tournaments/tournament-edit/tournament-edit-general/tournament-edit-general.component';
import {TournamentEditVenueComponent} from './components/tournaments/tournament-edit/tournament-edit-venue/tournament-edit-venue.component';
import {TournamentEditCategoriesComponent} from './components/tournaments/tournament-edit/tournament-edit-categories/tournament-edit-categories.component';
import {TournamentEditCategorySettingsComponent} from './components/tournaments/tournament-edit/tournament-edit-categories-settings/tournament-edit-category-settings.component';
import {TournamentEditRightMenuComponent} from './components/tournaments/tournament-edit/tournament-edit-right-menu/tournament-edit-right-menu.component';
import {AgmCoreModule} from '@agm/core';
import {CompetitorsComponent} from './components/competitors/competitors.component';
import {ProfileComponent} from './components/profile/profile.component';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/auth/login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// used to create fake backend
// import {fakeBackendProvider} from './helpers/fake-backend';
import {TokenInterceptor} from './helpers/TokenInterceptor';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {RegisterComponent} from './components/auth/register/register.component';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {NgbdDatepickerRange} from './components/form/datepicker-range';
import {NewCategoryModalComponent} from './components/modals/new-category-modal/new-category-modal.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SlugPipe} from './pipes/slug.pipe';
import {TreesComponent} from './components/trees/trees.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';
import {FooterComponent} from './components/footer/footer.component';
import {PreliminaryComponent} from './components/trees/preliminary/preliminary.component';
import {PlayoffComponent} from './components/trees/playoff/playoff.component';
import {SingleEliminationComponent} from './components/trees/single-elimination/single-elimination.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AddCompetitorsModalComponent} from './components/modals/add-competitors-modal/add-competitors-modal.component';
import {FightsComponent} from './components/fights/fights.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import * as Raven from 'raven-js';
import {NgPipesModule} from 'ngx-pipes';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider, LinkedInLoginProvider,
} from 'angularx-social-login';
import { TeamsComponent } from './components/teams/teams.component';

Raven
  .config(environment.sentryDns)
  .install();

// export class RavenErrorHandler implements ErrorHandler {
//   handleError(err: any): void {
//     Raven.captureException(err);
//   }
// }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.fbAppId)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.googleAppId)
      },
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
      // },
    ]);
}

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: environment.apiUrl + '/user/avatar',
  createImageThumbnails: true,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TournamentsComponent,
    NavComponent,
    TournamentCreateComponent,
    TournamentEditComponent,
    TournamentEditGeneralComponent,
    TournamentEditVenueComponent,
    TournamentEditCategoriesComponent,
    TournamentEditCategorySettingsComponent,
    TournamentEditRightMenuComponent,
    CompetitorsComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NgbdDatepickerRange,
    NewCategoryModalComponent,
    SlugPipe,
    TreesComponent,
    ResetPasswordComponent,
    FooterComponent,
    PreliminaryComponent,
    PlayoffComponent,
    SingleEliminationComponent,
    AddCompetitorsModalComponent,
    FightsComponent,
    TeamsComponent
  ],
  entryComponents: [NewCategoryModalComponent, AddCompetitorsModalComponent],
  imports: [
    SocialLoginModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      tapToDismiss: true,
      preventDuplicates: true,
      maxOpened: 1,
      autoDismiss: true
    }), // ToastrModule added
    AppRoutingModule,
    HttpClientModule,
    DropzoneModule,
    NgPipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMbCISDkoc5G1AP1mw8K76MsaN0pyF64k',
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthenticationService.tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/login']
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
    // {provide: ErrorHandler, useClass: RavenErrorHandler}

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
