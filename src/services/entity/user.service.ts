import {Injectable} from '@angular/core';
import {User} from '../../entities/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Team} from '../../entities/Team';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userURL = environment.localURL + '/user';

    constructor(private http: HttpClient) {
    }

    getUserInfo(username: string): Promise<User> {
        // ./cookie-interceptor.ts встраивает опции всем запросам

        return this.http.get(this.userURL + '/info/' + username)
            .pipe(map(data => data['user_info'])).toPromise();
    }

    updateUser(user: User, avatar: File): Promise<User> {
        // ./cookie-interceptor.ts встраивает опции всем запросам

        const body = new FormData();
        body.set('jid', user.jid);
        body.set('avatar', avatar);

        return this.http.patch(this.userURL, body)
            .pipe(map(data => {
                data['user'].avatar = environment.localURL + '/user/avatar/' + data['user'].username;
                return data['user'];
            })).toPromise();
    }

    getInvites(): Promise<Team[]> {
        // ./cookie-interceptor.ts встраивает опции всем запросам

        return this.http.get(this.userURL + '/invites')
            .pipe(map(data => data['invites'])).toPromise();
    }

    getTeams(userId: string) {
        return this.http.get(this.userURL + '/teams/' + userId)
            .pipe(map(data => data['teams'])).toPromise();
    }
}
