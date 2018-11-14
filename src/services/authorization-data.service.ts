import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
// service for api call to get roles
export class AuthorizationDataService {
    private authURL = environment.localURL + '/user/roles';

    getPermissions(): Promise<any> {
        const options = {
            headers: new HttpHeaders({
                'If-Modified-Since': '0'
            }),
            withCredentials: true

        };
        return this.http.get(this.authURL, options).toPromise();
    }

    constructor(private http: HttpClient) {
    }
}
