import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TeamsComponent} from './teams/teams.component';
import {HelpComponent} from './help/help.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'tournaments', component: TournamentsComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'help', component: HelpComponent},
    {path: 'profile', component: ProfileComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
