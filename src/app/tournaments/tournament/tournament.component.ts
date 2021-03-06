import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../../entities/Tournament';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../../services/entity-data/tournament.service';
import {Location} from '@angular/common';
import {LocalUserService} from '../../../services/local-user.service';
import {Team} from '../../../entities/Team';
import {UserDataService} from '../../../services/entity-data/user-data.service';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
    tour: Tournament;
    isOwner = false;
    joinOpen = false;
    chosenTeam: string;
    joinError: string;
    teams: Team[];
    tournamentCondition: string;

    constructor(
        private route: ActivatedRoute,
        private tourService: TournamentService,
        private location: Location,
        private userService: LocalUserService,
        private userDataService: UserDataService,
        private authService: AuthService
    ) {
    }

    async ngOnInit() {
        this.getTour();
        if (this.userService.getUser()._id) {
            this.teams = await this.userDataService.getTeams(this.userService.getUser()._id);
            console.log(this.teams);
            this.teams = this.teams.filter((team) => {
                return this.userService.getUser().equals(team.captain); // && team.players.length === 5;
            });
        }
    }

    getTour(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.tourService.getTour(id)
            .subscribe(tour => {
                console.log(this.tour);
                this.tour = new Tournament(tour);
                this.isOwner =
                    this.userService.getUser().equals(this.tour.owner)
                    || this.authService.hasPermission('ADMIN');
                if (this.tour.finished) {
                    this.tournamentCondition = 'Finished';
                } else {
                    if (this.tour.started) {
                        this.tournamentCondition = 'Ongoing';
                    } else {
                        this.tournamentCondition = 'Upcoming';
                    }
                }
            });
    }

    async startTournament() {
        console.log(this.tour);
        this.tour = new Tournament(await this.tourService.startTournament(this.tour));
        console.log(this.tour);
    }

    async joinTournament() {
        try {
            console.log(1);
            this.tour = new Tournament(await this.tourService.joinTournament(this.tour, this.chosenTeam));
            console.log(1);
            this.joinOpen = false;
        } catch (err) {
            this.joinError = err;
            console.log(err);
        }
    }
}
