import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TournamentsComponent} from './components/tournaments/tournaments-index/tournaments.component';
import {TournamentEditComponent} from './components/tournaments/tournament-edit/tournament-edit.component';
import {TournamentCreateComponent} from './components/tournaments/tournament-create/tournament-create.component';
import {CompetitorsComponent} from './components/competitors/competitors.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';

import {AuthGuard} from './guards/auth.guard';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {TreesComponent} from './components/trees/trees.component';
import {FightsComponent} from './components/fights/fights.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'password/forgot', component: ForgotPasswordComponent},
  // {path: 'password/email', component: ForgotPasswordComponent},
  {path: 'password/reset', component: ResetPasswordComponent},
  // With Auth
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'tournaments', component: TournamentsComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/create', component: TournamentCreateComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:slug/edit', component: TournamentEditComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  {path: 'tournaments/:slug/competitors', component: CompetitorsComponent, canActivate: [AuthGuard]},
  {path: 'profile/:slug/edit', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'tournaments', component: TournamentsComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:slug/trees', component: TreesComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  {path: 'tournaments/:slug/fights', component: FightsComponent, canActivate: [AuthGuard]},
  // { path: '**', redirectTo: '' } // otherwise redirect to dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
