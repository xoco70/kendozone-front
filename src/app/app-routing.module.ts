import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TournamentsComponent} from './components/tournaments/tournaments-index/tournaments.component';
import {TournamentEditComponent} from './components/tournaments/tournament-edit/tournament-edit.component';
import {TournamentCreateComponent} from './components/tournaments/tournament-create/tournament-create.component';
import {CompetitorsComponent} from './components/competitors/competitors.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';

import { AuthGuard } from './guards/auth.guard';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'password/reset', component: ForgotPasswordComponent},
  // With Auth
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'tournaments', component: TournamentsComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/create', component: TournamentCreateComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id/edit', component: TournamentEditComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id/competitors', component: CompetitorsComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id/edit', component: ProfileComponent, canActivate: [AuthGuard]},
  // { path: '**', redirectTo: '' } // otherwise redirect to dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
