import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../entities/Team';
import {TeamService} from '../../../services/entity/team.service';
import {environment} from '../../../environments/environment';
import {ClrLoadingState} from '@clr/angular';
import {Tournament} from '../../../entities/Tournament';
import {Match} from '../../../entities/Match';
import {UserService} from '../../../services/entity/user.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    team: Team;
    tournaments: Tournament[];
    matches: Match[];
    _404 = false;
    avatarURL = environment.avatarURL;
    heroIconURL = environment.heroIconURL;
    inviteOpen = false;
    username: string;
    inviteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    userNotFound = false;
    isCaptain = false;

    constructor(private route: ActivatedRoute,
                private teamService: TeamService,
                private userService: UserService) {
    }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        try {
            this.team = await this.teamService.getTeam(id);
            this.isCaptain = this.userService.user.equals(this.team.captain);
            this.tournaments = await this.teamService.getTournaments(this.team);
            this.matches = await this.teamService.getMatches();
            console.log(this.matches);
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        switch (error.status) {
            case 404:
                this._404 = true;
                break;
            default:
                throw error;
        }
    }

    async invitePlayer() {
        try {
            this.inviteBtnState = ClrLoadingState.LOADING;
            await this.teamService.invitePlayer(this.team, this.username);
            this.inviteBtnState = ClrLoadingState.SUCCESS;
            this.userNotFound = false;
        } catch (e) {
            this.userNotFound = true;
            this.inviteBtnState = ClrLoadingState.ERROR;
        }
    }

}
