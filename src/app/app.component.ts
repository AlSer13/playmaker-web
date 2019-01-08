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
    username = this.userService.getUser().username;
    tabbing = false;

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

    private handleTab(e: KeyboardEvent) {
        if (e.keyCode === 9 && !this.tabbing) {
            document.body.classList.add('user-is-tabbing');
            this.tabbing = true;
        }
    }

    private handleMouse(e: MouseEvent) {
        document.body.classList.remove('user-is-tabbing');
        this.tabbing = false;
    }

    constructor(private authenticationService: AuthenticationService,
                private userService: UserService,
                protected router: Router) {
        window.addEventListener('keydown', this.handleTab);
        window.addEventListener('mousedown', this.handleMouse);
    }
}

