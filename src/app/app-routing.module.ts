import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TeamsComponent} from './teams/teams.component';
import {HelpComponent} from './help/help.component';
import {ProfileComponent} from './profile/profile.component';
import {TournamentComponent} from './tournaments/tournament/tournament.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'tournaments', component: TournamentsComponent},
    {path: 'tournaments/:id', component: TournamentComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'help', component: HelpComponent},
    {
        path: 'signup',
        canActivate: [AuthGuardService],
        data: {required: 'VISITOR', redirect: '/profile'},
        component: SignupComponent
    },
    {
        path: 'login',
        canActivate: [AuthGuardService],
        data: {required: 'VISITOR', redirect: '/profile'},
        // ОСТОРОЖНО, если у пользователя не будет
        // ни USER, ни VISITOR, всему конец
        // (кольцевой redirect profile <-> login)
        component: LoginComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuardService],
        data: {required: 'USER', redirect: '/login'},
        component: ProfileComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
