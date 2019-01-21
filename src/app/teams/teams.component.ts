import {Component, OnInit, ViewChild} from '@angular/core';
import {Team} from '../../entities/Team';
import {TeamService} from '../../services/entity-data/team.service';
import {LocalUserService} from '../../services/local-user.service';
import {User} from '../../entities/User';
import {AddTeamWizardComponent} from '../user/add-team-wizard/add-team-wizard.component';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';


@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

    @ViewChild('teamWizard') teamWizard: AddTeamWizardComponent;
    teams: Team[] = [];
    user: User;
    query = '';
    limit = 4;

    scrollCallback;

    public keyUp = new Subject<string>();

    private subscription: Subscription;

    constructor(private teamService: TeamService,
                private userService: LocalUserService) {
        this.scrollCallback = this.scroll.bind(this);
    }

    ngOnInit() {
        this.subscription = this.keyUp.pipe(
            debounceTime(700),
            distinctUntilChanged(),
            switchMap(() => this.search())
        ).subscribe();

        this.user = this.userService.getUser();
    }

    scroll(): Observable<Team[]> {
        console.log('scroll');
        return this.teamService.getTeams(this.query, this.teams.length, this.limit)
            .pipe(tap((teams) => this.teams = this.teams.concat(teams)));
    }

    search(): Observable<Team[]> {
        console.log('search');
        return this.teamService.getTeams(this.query, 0, this.limit)
            .pipe(tap((teams) => this.teams = teams));
    }
}
