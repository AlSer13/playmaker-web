import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../services/entity/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Playmaker';
    username = this.userService.user.username;

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

    async logOut() {
        await this.authenticationService.logOut();
        window.location.reload();
    }

    constructor(private authenticationService: AuthenticationService, private userService: UserService, protected router: Router) {
    }

}

