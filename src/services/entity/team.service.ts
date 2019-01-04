import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
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
        return this.http.get<Team>(this.teamURL + '/' + id)
            .pipe(map(data => data['team'])).toPromise();
    }

    getTeams(): Promise<Team[]> {
        return this.http.get<Team[]>(this.teamURL)
            .pipe(map(data => data['teams'])).toPromise();
    }

    async addTeam(name: string): Promise<Team> {
        const body = {name: name};
        try {
            return await this.http.post(this.teamURL, body)
                .pipe(map(data => data['addedTeam'])).toPromise();
        } catch (error) {
            return null;
        }
    }

    async invitePlayer(team: Team, playerUsername: string): Promise <any> {
        const body = {username: playerUsername};
        const url = this.teamURL + '/' + team._id + '/players';
        return await this.http.post<Team>(url, body).toPromise();
    }
}
