import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../entities/User';
import {map} from 'rxjs/operators';
import {Team} from '../../entities/Team';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private userURL = environment.localURL + '/user';

    constructor(private http: HttpClient) {
    }

    getUserInfo(username: string): Promise<User> {
        // ./cookie-interceptor.ts встраивает опции всем запросам

        return this.http.get(this.userURL + '/info/' + username)
            .pipe(map(data => data['user_info'])).toPromise();
    }

    updateUser(avatar: File, jid: string, email: string, currentPass: string, newPass: string): Promise<User> {
        // ./cookie-interceptor.ts встраивает опции всем запросам

        const body = new FormData();
        body.set('jid', jid);
        body.set('avatar', avatar);
        body.set('email', email);
        body.set('currentPass', currentPass);
        body.set('newPass', newPass);


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

    getTournaments(user: User) {
        return this.http.get(this.userURL + '/tournaments/' + user._id)
            .pipe(map(data => data['tournaments'])).toPromise();
    }

    followTournament(tournamentId: string) {
        const body = {};
        return this.http.post(this.userURL + '/fav/follow/' + tournamentId, body)
            .pipe(map(data => data['addedTournament'])).toPromise();
    }

    unfollowTournament(tournamentId: string) {
        const body = {};
        return this.http.post(this.userURL + '/fav/unfollow/' + tournamentId, body)
            .pipe(map(data => data['removedTournament'])).toPromise();
    }
}
