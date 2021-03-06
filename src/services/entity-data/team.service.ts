import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Team} from '../../entities/Team';
import {Tournament} from '../../entities/Tournament';
import {Match} from '../../entities/Match';
import {User} from '../../entities/User';
import {Observable} from 'rxjs';

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

    getTeams(query: string, skip: number, limit: number): Observable<Team[]> {
        const params = new HttpParams()
            .set('searchQuery', query)
            .set('skip', String(skip))
            .set('limit', String(limit));
        const options = {params: params};
        return this.http.get<Team[]>(this.teamURL, options)
            .pipe(map(data => data['teams']));
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

    async invitePlayer(team: Team, playerUsername: string): Promise<any> {
        const body = {username: playerUsername};
        const url = this.teamURL + '/' + team._id + '/players';
        return await this.http.post<Team>(url, body).toPromise();
    }

    async joinTeam(team: Team): Promise<any> {
        const url = this.teamURL + '/' + team._id + '/join';
        return await this.http.post<Team>(url, {}).toPromise();
    }

    async getTournaments(team: Team): Promise<Tournament[]> {
        const options = {params: new HttpParams().set('finished', 'true')};
        return this.http.get<Tournament>(this.teamURL + '/' + team._id + '/tournaments', options)
            .pipe(map(data => data['tournaments'])).toPromise();
    }

    async getMatches(team: Team): Promise<Match[]> {
        const options = {params: new HttpParams().set('limit', '5')};
        return this.http.get<Match>(`${this.teamURL}/${team._id}/matches`, options)
            .pipe(map(data => data['matches'])).toPromise();
    }

    async kickPlayer(user: User, team: Team): Promise<Team> {
        return this.http.request<Team>('DELETE', this.teamURL + '/' + team._id + '/players', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {userId: user._id}
        }).pipe(map(data => data['updatedTeam'])).toPromise();
    }
}
