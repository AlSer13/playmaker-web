import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private loginURL = environment.localURL + '/user/login';
    private logoutURL = environment.localURL + '/user/logout';

    constructor(private http: HttpClient, private authorizationService: AuthService) {

    }

    logIn(asadmin: boolean, username: string, password: string): Observable<any> {
        const options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        const body = {username: username, password: password};
        return this.http.post(this.loginURL, body, options);
    }

    logOut() {

    }
}
