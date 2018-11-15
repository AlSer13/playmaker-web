import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../entities/User';
import {map} from 'rxjs/operators';
import {Team} from '../../entities/Team';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private teamURL = environment.localURL + '/teams';

    constructor(private http: HttpClient) {
    }

    getTeam(id: string): Promise<Team> {
        return this.http.get<User>(this.teamURL + '/' + id)
            .pipe(map(data => data['team'])).toPromise();
    }

    getTeams(): Promise<Team[]> {
        return this.http.get<Team[]>(this.teamURL)
            .pipe(map(data => data['teams'])).toPromise();
    }
}
