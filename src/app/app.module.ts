import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// import {AccordionModule} from 'primeng/accordion';
// import {CardModule} from 'primeng/card';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TeamsComponent} from './teams/teams.component';
import {HelpComponent} from './help/help.component';
import {ProfileComponent} from './profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ClarityModule } from '@clr/angular';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        TournamentsComponent,
        TeamsComponent,
        HelpComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        // CardModule, // primeng
        // AccordionModule, // primeng
        BrowserAnimationsModule,
        ClarityModule, // clarity
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
