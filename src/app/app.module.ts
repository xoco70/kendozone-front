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


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TournamentsComponent,
    MessagesComponent,
    NavComponent,
    TournamentCreateComponent,
    TournamentEditComponent
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
