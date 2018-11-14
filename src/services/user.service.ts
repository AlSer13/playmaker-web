import {Injectable} from '@angular/core';
import {User} from '../entities/User';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userURL = environment.localURL + '/user';

    constructor(private http: HttpClient) {
    }

    getUser(username: string): Observable<User> {
        return this.http.get<User>(this.userURL + '/' + username)
            .pipe(map(data => data['user_info']));
    }
}
