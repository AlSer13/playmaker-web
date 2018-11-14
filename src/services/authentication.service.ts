import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private loginURL = environment.localURL + '/user/login';
    private logoutURL = environment.localURL + '/user/logout';
    constructor(private http: HttpClient,
                private authorizationService: AuthService) {

    }

    async logIn(asadmin: boolean, username: string, password: string, rememberMe: boolean): Promise<any> {
        const options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            withCredentials: true

        };
        const body = {username: username, password: password, asadmin: asadmin, rememberMe: rememberMe};
        try {
            const data = await this.http.post(this.loginURL, body, options).toPromise();
            await this.authorizationService.initializePermissions();
            return data;
        } catch (error) {
            return null;
        }
    }

    async logOut(): Promise<any> {
        const options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            withCredentials: true
        };
        await this.http.post(this.logoutURL, {}, options).toPromise();
        await this.authorizationService.initializePermissions();
    }

    async usernameExists(username: string): Promise<boolean> {
        const options = {params: new HttpParams().set('username', username)};
        const data = await this.http.get(environment.localURL + '/user/uexists', options).toPromise();
        return data['exists'];
    }

    async emailExists(email: string): Promise<boolean> {
        const options = {params: new HttpParams().set('email', email)};
        const data = await this.http.get(environment.localURL + '/user/eexists', options).toPromise();
        return data['exists'];
    }

    async signUp(username: string, email: string, password: string): Promise<any> {
        const body = {username: username, password: password, email: email};
        const options = {};
        return await this.http.post(environment.localURL + '/user/signup', body, options).toPromise();
    }
}
