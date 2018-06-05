import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TournamentsComponent} from './tournaments/tournaments-index/tournaments.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {MessagesComponent} from './messages/messages.component';
import {NavComponent} from './nav/nav.component';
import { TournamentCreateComponent } from './tournaments/tournament-create/tournament-create.component';
import { TournamentEditComponent } from './tournaments/tournament-edit-component/tournament-edit.component';
import { TournamentEditGeneralComponent } from './tournaments/tournament-edit-component/tournament-edit-component-general/tournament-edit-general.component';
import { TournamentEditVenueComponent } from './tournaments/tournament-edit-component/tournament-edit-component-venue/tournament-edit-venue.component';
import { TournamentEditCategoriesComponent } from './tournaments/tournament-edit-component/tournament-edit-component-categories/tournament-edit-categories.component';
import { TournamentEditCategorySettingsComponent } from './tournaments/tournament-edit-component/tournament-edit-component-categories-settings/tournament-edit-category-settings.component';
import { TournamentEditRightMenuComponent } from './tournaments/tournament-edit-component/tournament-edit-right-menu/tournament-edit-right-menu.component';


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
    TournamentEditRightMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
