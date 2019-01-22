import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../entities/Tournament';
import {LocalUserService} from '../../../services/local-user.service';

@Component({
    selector: 'app-tournament-card',
    templateUrl: './tournament-card.component.html',
    styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

    @Input() tournament: Tournament;
    tournamentCondition: string;
    isSelected: boolean;
    loadingSubscription = true;

    constructor(private userService: LocalUserService) {
    }

    ngOnInit() {
        this.checkSelected().then();
        if (this.tournament.finished) {
            this.tournamentCondition = 'Finished';
        } else {
            if (this.tournament.started) {
                this.tournamentCondition = 'Ongoing';
            } else {
                this.tournamentCondition = 'Upcoming';
            }
        }
    }

    followBtnClicked() {
        this.loadingSubscription = true;
        if (!this.isSelected) {
            this.userService.followTournament(this.tournament).then(
                () => this.checkSelected()
            );
        } else {
            this.userService.unfollowTournament(this.tournament).then(
                () => this.checkSelected()
            );
        }
    }

    async checkSelected() {
        const selectedTours = (await this.userService.getSelectedTournaments());
        if (selectedTours) {
            this.isSelected = selectedTours.map(t => t._id).includes(this.tournament._id);
        }
        this.loadingSubscription = false;
    }

}
