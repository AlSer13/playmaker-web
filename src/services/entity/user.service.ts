import {Injectable} from '@angular/core';
import {User} from '../../entities/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userURL = environment.localURL + '/user';

    constructor(private http: HttpClient) {
    }

    getUser(username: string): Promise<User> {
        const options = {
            headers: new HttpHeaders({
                'If-Modified-Since': '0'
            }),
            withCredentials: true

        };
        return this.http.get<User>(this.userURL + '/' + username, options)
            .pipe(map(data => data['user_info'])).toPromise();
    }
}
