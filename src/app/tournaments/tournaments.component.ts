import {Component, OnInit} from '@angular/core';
import {Tournament} from '../Tournament';
import {TournamentService} from '../tournament.service';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
    tours: Tournament[];
    auth: boolean;

    constructor(private tourService: TournamentService, private authService: AuthService) {
    }

    getTours(): void {
        this.tourService.getTours()
            .subscribe(tours => this.tours = tours);
    }

    ngOnInit() {
        this.getTours();
        this.auth = this.authService.isAuthed();
    }

    search() {

    }

}
