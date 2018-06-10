import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

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
import {CompetitorsRightMenuComponent} from './components/competitors/competitors-right-menu/competitors-right-menu.component';
import {ProfileComponent} from './components/profile/profile.component';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/auth/login/login.component';
// used to create fake backend
// import {fakeBackendProvider} from './helpers/fake-backend';
import {TokenInterceptor} from './helpers/TokenInterceptor';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService, TOKEN} from './services/authentication.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {LoadingModule} from 'ngx-loading';
import {NgbdDatepickerRange} from './components/form/datepicker-range';
import { NewCategoryModalComponent } from './components/modals/new-category-modal/new-category-modal.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
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
    CompetitorsRightMenuComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NgbdDatepickerRange,
    NewCategoryModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      tapToDismiss: true
    }), // ToastrModule added
    AppRoutingModule,
    HttpClientModule,
    DropzoneModule,
    LoadingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMbCISDkoc5G1AP1mw8K76MsaN0pyF64k',
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthenticationService.tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/auth/login']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
