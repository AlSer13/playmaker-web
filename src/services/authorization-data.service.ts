import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthGroup} from '../models/authorization.types';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
// service for api call to get roles
export class AuthorizationDataService {
    private authURL = environment.localURL + '/user/roles';

    getPermissions(): Promise<AuthGroup[]> {
        const options = {
            headers: new HttpHeaders({
                'If-Modified-Since': '0'
            }),
            withCredentials: true

        };
        return this.http.get(this.authURL, options).pipe(map(data => data['authGroup'])).toPromise();
    }

    constructor(private http: HttpClient) {
    }
}
