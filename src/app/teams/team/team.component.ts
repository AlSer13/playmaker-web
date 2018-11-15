import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../entities/Team';
import {TeamService} from '../../../services/entity/team.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    team: Team;
    _404 = false;

    constructor(private route: ActivatedRoute,
                private teamService: TeamService) {
    }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        try {
            this.team = await this.teamService.getTeam(id);
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

}
