import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthGroup} from '../models/authorization.types';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
// service for api call to get roles
export class AuthorizationDataService {
    private authURL = environment.localURL + '/roles';

    getPermissions(): Promise<AuthGroup[]> {
        return this.http.get(this.authURL).pipe(map(data => data['authGroup'])).toPromise();
    }

    constructor(private http: HttpClient) {
    }
}
