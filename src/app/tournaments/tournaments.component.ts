import {Component, OnInit} from '@angular/core';
import {Tournament} from '../Tournament';
import {TournamentService} from '../tournament.service';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
    tours: Tournament[];

    constructor(private tourService: TournamentService) {
    }

    getTours() {
        this.tourService.getTours()
            .subscribe(data => this.tours = data['tournaments']);
    }

    ngOnInit() {
        this.getTours();
    }

}
