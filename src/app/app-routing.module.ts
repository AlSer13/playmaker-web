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
import {ErrorPageComponent} from './error-page/error-page.component';
import {TeamComponent} from './teams/team/team.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {UserInvitesComponent} from './user/user-invites/user-invites.component';
import {MatchComponent} from './match/match.component';
import {UserSubscriptionsComponent} from './user/user-subscriptions/user-subscriptions.component';
import {RestoreComponent} from './restore/restore.component';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'tournaments', component: TournamentsComponent},
    {path: 'tournaments/:id', component: TournamentComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'teams/:id', component: TeamComponent},
    {path: 'help', component: HelpComponent},
    {
        path: 'signup',
        canActivate: [AuthGuardService],
        data: {required: 'VISITOR', redirect: '/main'},
        component: SignupComponent
    },
    {
        path: 'login',
        canActivate: [AuthGuardService],
        data: {required: 'VISITOR', redirect: '/main'},
        // ОСТОРОЖНО, если у пользователя не будет
        // ни USER, ни VISITOR, всему конец
        // (кольцевой redirect user <-> login)
        component: LoginComponent
    },
    {
        path: 'user/:username',
        component: UserComponent
    },
    {
        path: 'settings',
        canActivate: [AuthGuardService],
        data: {required: 'USER', redirect: '/login'},
        component: UserSettingsComponent
    },
    {
        path: 'subscriptions',
        component: UserSubscriptionsComponent
    },
    {
        path: 'invites',
        component: UserInvitesComponent
    },
    {
        path: 'match/:matchId',
        component: MatchComponent
    },
    {
        path: 'restore/:restoreKey',
        canActivate: [AuthGuardService],
        data: {required: 'VISITOR', redirect: '/main'},
        component: RestoreComponent
    },
    {
        path: '**', component: ErrorPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
