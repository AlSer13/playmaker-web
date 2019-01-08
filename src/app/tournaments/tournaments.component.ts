import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../entities/Tournament';
import {TournamentService} from '../../services/entity/tournament.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
    tours: Tournament[];

    constructor(private tourService: TournamentService) {
    }

    getTours(): Observable<any> {
        return this.tourService.getTours()
            .pipe(tap(tours => {
                    tours = tours.map(t => new Tournament(t));
                    this.tours = tours;
                }
            ));
    }

    ngOnInit() {
        this.getTours().subscribe(() => console.log(this.tours));
    }

    search() {

    }

}
