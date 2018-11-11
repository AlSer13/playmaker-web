import {Component, HostListener, NgModule} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    combination = [];
    trueCombination = [50, 49, 52, 18, 17];
    asadmin = false;
    username: string;
    password: string;
    error = false;

    // ctrl alt 4 1 2
    @HostListener('document:keydown', ['$event'])
    onKeyDown(ev: KeyboardEvent) {
        this.error = false;
        const e = ev.keyCode;
        if (e === this.trueCombination.pop()) {
            this.combination.push(e);
            if (this.combination.toString() === '17,18,52,49,50') {
                this.asadmin = true;
                this.resetHotkey();
            }
        } else {
            this.resetHotkey();
        }
    }

    @HostListener('document:keyup', ['$event'])
    onKeyUp(ev: KeyboardEvent) {
        if (ev.keyCode === 17 || ev.keyCode === 18) {
            this.resetHotkey();
        }
    }

    resetHotkey() {
        this.combination.length = 0;
        this.trueCombination = [50, 49, 52, 18, 17];
    }

    constructor(private authenticationService: AuthenticationService, private authorizationService: AuthService, protected router: Router) {
    }

    logIn() {
        this.authenticationService.logIn(this.asadmin, this.username, this.password).subscribe(
            () => {
                this.error = false;
                this.authorizationService.initializePermissions().then(
                    () => {
                        this.router.navigate(['/profile']);
                    }
                );
            },
            (error: HttpErrorResponse) => {
                this.error = true;
            });
    }
}
