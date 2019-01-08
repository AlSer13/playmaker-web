import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Team} from '../../entities/Team';
import {Tournament} from '../../entities/Tournament';
import {Match} from '../../entities/Match';

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    private matchURL = environment.localURL + '/matches';

    constructor(private http: HttpClient) {
    }

    async getMatch(matchId: Number): Promise<Match> {
        const options = {params: new HttpParams().set('parsed', 'true')};
        return this.http.get<Match>(this.matchURL + '/' + matchId, options)
            .pipe(map(data => data['match'])).toPromise();
    }
}
