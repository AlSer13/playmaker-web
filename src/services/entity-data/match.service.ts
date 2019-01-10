import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Match} from '../../entities/Match';
import {ParsedMatch} from '../../entities/ParsedMatch';

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    private matchURL = environment.localURL + '/matches';

    constructor(private http: HttpClient) {
    }

    async getParsedMatch(matchId: Number): Promise<ParsedMatch> {
        const options = {params: new HttpParams().set('parsed', 'true')};
        return this.http.get<ParsedMatch>(this.matchURL + '/' + matchId, options)
            .pipe(map(data => data['match'])).toPromise();
    }

    async getMatch(matchId: Number): Promise<Match> {

        return this.http.get<Match>(this.matchURL + '/' + matchId)
            .pipe(map(data => {
                let match : Match = data['match'];
                match.players.forEach((player) => {
                    player.items = [];
                    for (let i = 0; i < 6; i++) {
                        if (player['item_' + i]) player.items.push(player['item_' + i]);
                    }
                });
                console.log(match.players);
                return match;
            })).toPromise();
    }


}
