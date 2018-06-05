import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {TournamentsComponent} from './tournaments/tournaments-index/tournaments.component';
import {TournamentEditComponent} from './tournaments/tournament-edit-component/tournament-edit.component';
import {TournamentCreateComponent} from './tournaments/tournament-create/tournament-create.component';
import {CompetitorsComponent} from './competitors/competitors.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tournaments', component: TournamentsComponent},
  {path: 'tournaments/create', component: TournamentCreateComponent},
  {path: 'tournaments/:id/edit', component: TournamentEditComponent},
  {path: 'tournaments/:id/competitors', component: CompetitorsComponent},
  {path: 'profile/:id/edit', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
