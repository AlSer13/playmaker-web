import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Tournament} from './Tournament';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private tournamentsUrl = 'http://localhost:3000/tournaments';

    constructor(private http: HttpClient) {
    }

    getTours(): Observable<Tournament[]> {
        return this.http.get(this.tournamentsUrl).pipe(map(data => data['tournaments']));
        // return of(resp);
    }

    getTour(id: string): Observable<Tournament> {
        console.log('Getting a TOURNAMENT ' + this.tournamentsUrl + '/' + id);
        return this.http.get<Tournament>(this.tournamentsUrl + '/' + id)
            .pipe(map(data => data['tournament']));
    }
}
