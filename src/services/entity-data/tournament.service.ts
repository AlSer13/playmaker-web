import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Tournament} from '../../entities/Tournament';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private tourURL = environment.localURL + '/tournaments';

    constructor(private http: HttpClient) {
    }

    getTours(query: string, skip: number, limit: number, filters: { tourStatus: string } = {tourStatus: 'all'}): Observable<Tournament[]> {
        let params = new HttpParams()
            .set('searchQuery', query)
            .set('skip', String(skip))
            .set('limit', String(limit));
        if (filters.tourStatus !== 'all') {
            params = params.set('tourStatus', filters.tourStatus);
        }
        const options = {params: params};
        return this.http.get<Tournament[]>(this.tourURL, options)
            .pipe(map(data => data['tournaments']));
    }

    getTour(id: string): Observable<Tournament> {
        console.log('Getting a TOURNAMENT ' + this.tourURL + '/' + id);
        return this.http.get<Tournament>(this.tourURL + '/' + id)
            .pipe(map(data => data['tournament']));
    }

    async startTournament(tour: Tournament): Promise<Tournament> {
        return await this.http.post<Tournament>(this.tourURL + '/' + tour._id + '/start', {})
            .pipe(map(data => data['updatedTournament'])).toPromise();
    }

    async joinTournament(tour: Tournament, teamId: string): Promise<Tournament> {
        const body = {teamId: teamId};
        return await this.http.post<Tournament>(this.tourURL + '/' + tour._id + '/join', body)
            .pipe(map(data => {
                console.log(data);
                if (data['successful']) {
                    return data['updatedTournament'];
                } else {
                    throw data['error'];
                }
            })).toPromise();
    }

    async addTour(tourJSON: any) {
        return await this.http.post(this.tourURL + '/', tourJSON)
            .pipe(map(data => {
                return data['addedTournament'];
            })).toPromise();
    }
}
