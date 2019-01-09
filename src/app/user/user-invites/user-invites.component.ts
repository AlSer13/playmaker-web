import {Component, OnInit} from '@angular/core';
import {Team} from '../../../entities/Team';
import {LocalUserService} from '../../../services/local-user.service';
import {TeamService} from '../../../services/entity-data/team.service';

@Component({
    selector: 'app-user-invites',
    templateUrl: './user-invites.component.html',
    styleUrls: ['./user-invites.component.css']
})
export class UserInvitesComponent implements OnInit {

    invites: Team[];
    error: any;

    constructor(private userService: LocalUserService, private teamService: TeamService) {

    }

    async ngOnInit() {
        try {
            this.invites = await this.userService.getInvites();
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

    async acceptInvite(event, team: Team) {
        event.stopPropagation();
        await this.teamService.joinTeam(team);
        this.invites = await this.userService.getInvites();
    }

    declineInvite(event, team: Team) {
        event.stopPropagation();
        console.log('Очень жаль, но нельзя отклонять dada приглашения');
    }
}
