import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
// service for api call to get roles
export class AuthorizationDataService {
    private authURL = environment.localURL + '/user/roles';

    getPermissions(): Promise<any> {
        return this.http.get(this.authURL).toPromise();
    }

    constructor(private http: HttpClient) {
    }
}
