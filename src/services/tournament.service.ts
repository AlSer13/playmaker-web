import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Tournament} from '../entities/Tournament';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private tourURL = environment.localURL + '/tournaments';

    constructor(private http: HttpClient) {
    }

    getTours(): Observable<Tournament[]> {
        return this.http.get(this.tourURL).pipe(map(data => data['tournaments']));
        // return of(resp);
    }

    getTour(id: string): Observable<Tournament> {
        console.log('Getting a TOURNAMENT ' + this.tourURL + '/' + id);
        return this.http.get<Tournament>(this.tourURL + '/' + id)
            .pipe(map(data => data['tournament']));
    }
}