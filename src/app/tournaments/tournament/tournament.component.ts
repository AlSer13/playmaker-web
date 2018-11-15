import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../../entities/Tournament';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../../services/entity/tournament.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
    tour: Tournament;

    constructor(
        private route: ActivatedRoute,
        private tourService: TournamentService,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        this.getTour();
    }

    getTour(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.tourService.getTour(id)
            .subscribe(tour => {
                this.tour = tour;
            });
    }

    goBack(): void {
        this.location.back();
    }

}
