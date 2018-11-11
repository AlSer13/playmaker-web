import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TeamsComponent} from './teams/teams.component';
import {HelpComponent} from './help/help.component';
import {ProfileComponent} from './profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ClarityModule} from '@clr/angular';
import {AuthService} from '../services/auth.service';
import {TournamentComponent} from './tournaments/tournament/tournament.component';
import {LoginComponent} from './login/login.component';
import {HideForbiddenDirective} from '../directives/hide-forbidden.directive';
import {DisableForbiddenDirective} from '../directives/disable-forbidden.directive';
import {AuthorizationDataService} from '../services/authorization-data.service';
import {SignupComponent} from './signup/signup.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        TournamentsComponent,
        TeamsComponent,
        HelpComponent,
        ProfileComponent,
        TournamentComponent,
        LoginComponent,
        HideForbiddenDirective,
        DisableForbiddenDirective,
        SignupComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ClarityModule,
        FormsModule
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
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}

export function initApp(authService: AuthService) {
    return () => authService.initializePermissions();
}

