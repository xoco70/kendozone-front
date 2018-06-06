import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {TournamentsComponent} from './tournaments/tournaments-index/tournaments.component';
import {TournamentEditComponent} from './tournaments/tournament-edit-component/tournament-edit.component';
import {TournamentCreateComponent} from './tournaments/tournament-create/tournament-create.component';
import {CompetitorsComponent} from './competitors/competitors.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tournaments', component: TournamentsComponent},
  {path: 'tournaments/create', component: TournamentCreateComponent},
  {path: 'tournaments/:id/edit', component: TournamentEditComponent},
  {path: 'tournaments/:id/competitors', component: CompetitorsComponent},
  {path: 'profile/:id/edit', component: ProfileComponent},
  {path: 'auth/login', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
