import {Component, OnInit} from '@angular/core';
import {Team} from '../../../entities/Team';
import {UserService} from '../../../services/entity/user.service';
import {TeamService} from '../../../services/entity/team.service';

@Component({
    selector: 'app-user-invites',
    templateUrl: './user-invites.component.html',
    styleUrls: ['./user-invites.component.css']
})
export class UserInvitesComponent implements OnInit {

    invites: Team[];
    _404 = false;

    constructor(private userService: UserService, private teamService: TeamService) {

    }

    async ngOnInit() {
        try {
            this.invites = await this.userService.getInvites();
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

    async acceptInvite(event, team: Team) {
        event.stopPropagation();
        await this.teamService.joinTeam(team);
        this.invites= await this.userService.getInvites();
    }

    declineInvite(event, team: Team) {
        event.stopPropagation();
        console.log("Очень жаль, но нельзя отклонять dada приглашения")
    }
}
