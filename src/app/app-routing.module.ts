import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {TournamentsComponent} from './tournaments/tournaments-index/tournaments.component';
import {TournamentEditComponent} from './tournaments/tournament-edit-component/tournament-edit.component';
import {TournamentCreateComponent} from './tournaments/tournament-create/tournament-create.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tournaments', component: TournamentsComponent},
  {path: 'tournaments/create', component: TournamentCreateComponent},
  {path: 'tournaments/:id/edit', component: TournamentEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
