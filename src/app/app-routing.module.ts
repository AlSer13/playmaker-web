import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TeamsComponent} from './teams/teams.component';
import {HelpComponent} from './help/help.component';
import {UserComponent} from './user/user.component';
import {TournamentComponent} from './tournaments/tournament/tournament.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

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
        data: {required: 'VISITOR', redirect: '/user'},
        component: SignupComponent
    },
    {
        path: 'login',
        canActivate: [AuthGuardService],
        data: {required: 'VISITOR', redirect: '/user'},
        // ОСТОРОЖНО, если у пользователя не будет
        // ни USER, ни VISITOR, всему конец
        // (кольцевой redirect user <-> login)
        component: LoginComponent
    },
    {
        path: 'user/:username',
        component: UserComponent
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
