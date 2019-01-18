import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../../entities/Tournament';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../../services/entity-data/tournament.service';
import {Location} from '@angular/common';
import {LocalUserService} from '../../../services/local-user.service';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
    tour: Tournament;
    isOwner: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private tourService: TournamentService,
        private location: Location,
        private  userService: LocalUserService
    ) {
    }

    ngOnInit(): void {
        this.getTour();
    }

    getTour(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.tourService.getTour(id)
            .subscribe(tour => {
                this.tour = new Tournament(tour);
                this.isOwner = this.userService.getUser().equals(this.tour.owner);
            });
    }

    goBack(): void {
        this.location.back();
    }

    async startTournament() {
        console.log(this.tour);
        this.tour = new Tournament(await this.tourService.startTournament(this.tour));
        console.log(this.tour);
    }

}
