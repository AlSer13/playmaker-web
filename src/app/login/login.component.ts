import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {LocalUserService} from '../../services/local-user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    combination = [];
    trueCombination = [50, 49, 52, 18, 17];
    loading = false;
    rememberMe = true;
    asadmin = false;
    username: string;
    password: string;
    error = false;
    errorMessage = 'error';
    forgotOpen = false;
    restoringEmail: string;
    info = false;
    infoMessage: string;

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

    constructor(private authenticationService: AuthenticationService, private userService: LocalUserService,
                protected router: Router) {
    }

    async logIn() {
        if (this.username && this.password) {
            this.loading = true;
            const data = await this.authenticationService.logIn(this.asadmin, this.username, this.password);
            if (data) {
                this.error = false;
                console.log(this.userService.getUser());
                await this.router.navigate(['/user/' + this.userService.getUser().username]);
                this.loading = false;
                window.location.reload();
            } else {
                this.loading = false;
                this.displayError('Invalid username or password');
            }
        } else {
            this.displayError('All fields should be filled out');
        }
    }

    steamLogIn() {
        this.authenticationService.steamLogIn();
    }

    displayError(text: string) {
        this.errorMessage = text;
        this.error = true;
    }

    async restorePassword() {
        this.forgotOpen = false;
        await this.authenticationService.restorePassword(this.restoringEmail);
        this.infoMessage = 'If ' + this.restoringEmail + ' is your correct email, you will receive a letter soon';
        this.info = true;
    }
}
