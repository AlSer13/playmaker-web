import {Component, OnInit} from '@angular/core';
import {Team} from '../../entities/Team';
import {TeamService} from '../../services/entity/team.service';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
    teams: Team[];

    constructor(private teamService: TeamService) {
    }

    async getTeams() {
        this.teams = await this.teamService.getTeams();
    }

    ngOnInit() {
        this.getTeams();
    }

    search() {

    }

}
