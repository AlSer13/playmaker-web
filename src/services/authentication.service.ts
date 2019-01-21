import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';
import {DOCUMENT} from '@angular/common';
import {User} from '../entities/User';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private loginURL = environment.localURL + '/user/login';
    private logoutURL = environment.localURL + '/user/logout';
    private steamLoginURL = environment.localURL + '/user/steam/login';
    private connectSteamURL = environment.localURL + '/user/steam/add';
    private disconnectSteamURL = environment.localURL + '/user/steam/delete';
    private restorePassURL = environment.localURL + '/user/restorePass';


    constructor(private http: HttpClient,
                private authorizationService: AuthService, @Inject(DOCUMENT) private document: any) {

    }

    async logIn(asadmin: boolean, username: string, password: string, rememberMe: boolean): Promise<any> {
        const body = {username: username, password: password, asadmin: asadmin, rememberMe: rememberMe};
        try {
            const data = await this.http.post(this.loginURL, body).toPromise();
            await this.authorizationService.initializePermissions();
            return data;
        } catch (error) {
            return null;
        }
    }

    steamLogIn() {
        this.document.location.href = this.steamLoginURL;
    }

    connectSteam() {
        this.document.location.href = this.connectSteamURL;
    }

    disconnectSteam() {
        return this.http.post<User>(this.disconnectSteamURL, {})
            .pipe(map(data => data['user'])).toPromise();
    }

    async logOut(): Promise<any> {
        await this.http.post(this.logoutURL, {}).toPromise();
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

    restorePassword(restoringEmail: string) {
        console.log(restoringEmail);
        const body = {email: restoringEmail};
        this.http.post(this.restorePassURL, body);
    }
}
