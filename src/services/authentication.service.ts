import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private loginURL = environment.localURL + '/user/login';
    private logoutURL = environment.localURL + '/user/logout';

    constructor(private http: HttpClient,
                private authorizationService: AuthService,
                protected router: Router) {

    }

    async logIn(asadmin: boolean, username: string, password: string, rememberMe: boolean): Promise<boolean> {
        const options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            withCredentials: true

        };
        const body = {username: username, password: password, asadmin: asadmin, rememberMe: rememberMe};
        try {
            await this.http.post(this.loginURL, body, options).toPromise();
            await this.authorizationService.initializePermissions();
            return true;
        } catch (error) {
            console.log('error: ' + error.statusText);
            return false;
        }
    }

    async logOut() {
        const options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            withCredentials: true
        };
        await this.http.post(this.logoutURL, {}, options).toPromise();
        await this.authorizationService.initializePermissions();
        this.router.navigate(['/']);
    }
}
