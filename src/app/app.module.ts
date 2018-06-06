import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TournamentsComponent} from './tournaments/tournaments-index/tournaments.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessagesComponent} from './messages/messages.component';
import {NavComponent} from './nav/nav.component';
import { TournamentCreateComponent } from './tournaments/tournament-create/tournament-create.component';
import { TournamentEditComponent } from './tournaments/tournament-edit-component/tournament-edit.component';
import { TournamentEditGeneralComponent } from './tournaments/tournament-edit/tournament-edit-general/tournament-edit-general.component';
import { TournamentEditVenueComponent } from './tournaments/tournament-edit/tournament-edit-venue/tournament-edit-venue.component';
import { TournamentEditCategoriesComponent } from './tournaments/tournament-edit/tournament-edit-categories/tournament-edit-categories.component';
import { TournamentEditCategorySettingsComponent } from './tournaments/tournament-edit/tournament-edit-categories-settings/tournament-edit-category-settings.component';
import { TournamentEditRightMenuComponent } from './tournaments/tournament-edit/tournament-edit-right-menu/tournament-edit-right-menu.component';
import {AgmCoreModule} from '@agm/core';
import { CompetitorsComponent } from './competitors/competitors.component';
import { CompetitorsRightMenuComponent } from './competitors/competitors-right-menu/competitors-right-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

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
    MessagesComponent,
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    DropzoneModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMbCISDkoc5G1AP1mw8K76MsaN0pyF64k',
      libraries: ['places']
    }),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
