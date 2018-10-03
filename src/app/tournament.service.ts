import {Injectable} from '@angular/core';
import {resp} from './tournaments-stub';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private tournamentsUrl = 'http://localhost:3000/tournaments';
    constructor(private http: HttpClient) {
    }

    getTours() {
        return this.http.get(this.tournamentsUrl);
        // of(resp);

    }

}
