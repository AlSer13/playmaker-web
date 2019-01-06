import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../entities/Team';
import {TeamService} from '../../../services/entity/team.service';
import {environment} from '../../../environments/environment';
import {ClrLoadingState} from '@clr/angular';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    team: Team;
    _404 = false;
    avatarURL = environment.avatarURL;
    inviteOpen = false;
    username: string;
    inviteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    userNotFound = false;
    isCaptain = false;

    constructor(private route: ActivatedRoute,
                private teamService: TeamService,
                private authService: AuthService) {
    }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        try {
            this.team = await this.teamService.getTeam(id);
            this.isCaptain = this.authService.user.equals(this.team.captain);
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
