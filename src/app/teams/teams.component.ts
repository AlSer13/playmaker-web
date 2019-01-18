import {Component, OnInit, ViewChild} from '@angular/core';
import {Team} from '../../entities/Team';
import {TeamService} from '../../services/entity-data/team.service';
import {LocalUserService} from '../../services/local-user.service';
import {User} from '../../entities/User';
import {AddTeamWizardComponent} from '../user/add-team-wizard/add-team-wizard.component';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
    @ViewChild('teamWizard') teamWizard: AddTeamWizardComponent;

    teams: Team[];
    user: User;

    constructor(private teamService: TeamService, private userService: LocalUserService) {
    }

    async getTeams() {
        this.teams = await this.teamService.getTeams();
    }

    ngOnInit() {
        this.user = this.userService.getUser();
        this.getTeams();
    }

    search() {

    }

}
