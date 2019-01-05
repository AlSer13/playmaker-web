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
    private userURL = environment.localURL + '/user/info';
    private updateUserURL = environment.localURL + '/user';
    private userInvitesURL = environment.localURL + '/user/invites';

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
            .pipe(map(data => {
                data['user_info'].avatar = environment.localURL + '/user/avatar/' + data['user_info'].username;
                return data['user_info'];
            })).toPromise();
    }

    updateUser(user: User, avatar: File): Promise<User> {
        const options = {
            headers: new HttpHeaders({
                'If-Modified-Since': '0'
            }),
            withCredentials: true
        };


        let body = new FormData();
        body.set('jid', user.jid);
        body.set('avatar', avatar);

        return this.http.patch<User>(this.updateUserURL, body, options)
            .pipe(map(data => {
                data['user'].avatar = environment.localURL + '/user/avatar/' + data['user'].username;
                return data['user'];
            })).toPromise();
    }

    getInvites(): Promise<Team[]> {
        const options = {
            headers: new HttpHeaders({
                'If-Modified-Since': '0'
            }),
            withCredentials: true
        };

        return this.http.get<User>(this.userInvitesURL, options)
            .pipe(map(data => data['invites'])).toPromise();
    }
}
