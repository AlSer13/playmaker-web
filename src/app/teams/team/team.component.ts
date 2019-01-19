import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../entities/Team';
import {TeamService} from '../../../services/entity-data/team.service';
import {environment} from '../../../environments/environment';
import {ClrLoadingState} from '@clr/angular';
import {Tournament} from '../../../entities/Tournament';
import {Match} from '../../../entities/Match';
import {LocalUserService} from '../../../services/local-user.service';
import {User} from '../../../entities/User';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    team: Team;
    tournaments: Tournament[];
    matches: Match[];
    playerForKick: User;
    error: any;
    avatarURL = environment.avatarURL;
    heroIconURL = environment.steamMediaURL + '/heroes/';
    inviteOpen = false;
    leaveOpen = false;
    kickOpen = false;
    username: string;
    inviteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    userNotFound = false;
    isCaptain = false;
    isMember = false;

    constructor(private route: ActivatedRoute,
                private teamService: TeamService,
                private userService: LocalUserService) {
    }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        try {
            this.team = await this.teamService.getTeam(id);
            this.isCaptain = this.userService.getUser().equals(this.team.captain);
            console.log(this.team);
            this.team.players.forEach((player) => {
                if (this.userService.getUser().equals(player)) {
                    this.isMember = true;
                }
            });

            this.tournaments = await this.teamService.getTournaments(this.team);
            this.matches = await this.teamService.getMatches();
            console.log(this.matches);
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        this.error = error;
        // switch (error.status) {
        //     case 404:
        //         this._404 = true;
        //         break;
        //     default:
        //         throw error;
        // }
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

    async leave() {
        this.team = await this.teamService.kickPlayer(this.userService.getUser(), this.team);
        this.isMember = false;
        this.leaveOpen = false;
    }

    async kickPlayer() {
        this.team = await this.teamService.kickPlayer(this.playerForKick, this.team);
        this.kickOpen = false;
    }

    openKickModal(user: User) {
        this.playerForKick = user;
        this.kickOpen = true;
    }

}
