import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TeamsComponent} from './teams/teams.component';
import {HelpComponent} from './help/help.component';
import {UserComponent} from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClarityModule} from '@clr/angular';
import {AuthService} from '../services/auth.service';
import {TournamentComponent} from './tournaments/tournament/tournament.component';
import {LoginComponent} from './login/login.component';
import {HideForbiddenDirective} from '../directives/hide-forbidden.directive';
import {DisableForbiddenDirective} from '../directives/disable-forbidden.directive';
import {AuthorizationDataService} from '../services/authorization-data.service';
import {SignupComponent} from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorPageComponent} from './error-page/error-page.component';
import {TeamComponent} from './teams/team/team.component';
import {TournamentCardComponent} from './tournaments/tournament-card/tournament-card.component';
import {TeamCardComponent} from './teams/team-card/team-card.component';
import {CookieInterceptor} from '../services/cookie-interceptor';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { AddTeamWizardComponent } from './user/add-team-wizard/add-team-wizard.component';
import { UserInvitesComponent } from './user/user-invites/user-invites.component';
import { MatchComponent } from './match/match.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HeatmapComponent } from './match/heatmap/heatmap.component';
import { UserSubscriptionsComponent } from './user/user-subscriptions/user-subscriptions.component';
import { OverviewComponent } from './match/overview/overview.component';
import { ScoreboardComponent } from './match/overview/scoreboard/scoreboard.component';
import { AbilityUpgradesComponent } from './match/overview/ability-upgrades/ability-upgrades.component';
import { BracketComponent } from './tournaments/tournament/bracket/bracket.component';
import { AddTourWizardComponent } from './user/add-tour-wizard/add-tour-wizard.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        TournamentsComponent,
        TeamsComponent,
        HelpComponent,
        UserComponent,
        TournamentComponent,
        LoginComponent,
        HideForbiddenDirective,
        DisableForbiddenDirective,
        SignupComponent,
        ErrorPageComponent,
        TeamComponent,
        TournamentCardComponent,
        TeamCardComponent,
        AddTeamWizardComponent,
        UserSettingsComponent,
        UserInvitesComponent,
        MatchComponent,
        UserSubscriptionsComponent,
        HeatmapComponent,
        OverviewComponent,
        ScoreboardComponent,
        AbilityUpgradesComponent,
        BracketComponent,
        AddTourWizardComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule
    ],
    providers: [
        AuthorizationDataService,
        AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            multi: true,
            deps: [AuthService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CookieInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}

export function initApp(authService: AuthService) {
    return () => authService.initializePermissions();
}

