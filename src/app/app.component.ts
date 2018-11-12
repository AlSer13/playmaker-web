import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Playmaker';

    nav_components = [
        {
            text: 'Main',
            link: '/main',

        },
        {
            text: 'Tournaments',
            link: '/tournaments'
        },
        {
            text: 'Teams',
            link: '/teams'
        },
        {
            text: 'Help',
            link: '/help'
        }
    ];

    logOut() {
        this.authenticationService.logOut();
    }

    constructor(private authenticationService: AuthenticationService) {
    }

}

