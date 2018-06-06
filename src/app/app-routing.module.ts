import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {TournamentsComponent} from './tournaments/tournaments-index/tournaments.component';
import {TournamentEditComponent} from './tournaments/tournament-edit-component/tournament-edit.component';
import {TournamentCreateComponent} from './tournaments/tournament-create/tournament-create.component';
import {CompetitorsComponent} from './competitors/competitors.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';

import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'tournaments', component: TournamentsComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/create', component: TournamentCreateComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id/edit', component: TournamentEditComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id/competitors', component: CompetitorsComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id/edit', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', component: LoginComponent},
  { path: '**', redirectTo: '' } // otherwise redirect to dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
