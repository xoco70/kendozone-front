import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TournamentEditComponent} from './tournament-edit-component/tournament-edit.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tournaments', component: TournamentsComponent},
  {path: 'tournaments/:id', component: TournamentEditComponent}
  // {path: 'tournaments/create', component: TournamentCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
