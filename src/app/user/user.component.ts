import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../entities/User';
import {LocalUserService} from '../../services/local-user.service';
import {AuthService} from '../../services/auth.service';
import {Team} from '../../entities/Team';
import {UserDataService} from '../../services/entity-data/user-data.service';
import {AddTeamWizardComponent} from './add-team-wizard/add-team-wizard.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @ViewChild('teamWizard') teamWizard: AddTeamWizardComponent;

    user: User;
    teams: Team[];
    error: any;
    you: boolean; // is it current users page?

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private userDataService: UserDataService,
                private userService: LocalUserService) {

        // subscribe on route change
        route.params.forEach(params => {
            this.initData(params['username']);
        }).then();
    }

    ngOnInit() {
    }

    handleError(error) {
        this.error = error;
        // switch (error.status) {
        //     case 404:
        //         this.error = error;
        //         break;
        //     default:
        //         throw error;
        // }
    }

    async initData(username: string) {
        try {
            this.you = this.userService.getUser().username === username;
            if (this.you) {
                this.user = this.userService.getUser();
                this.teams = await this.userService.getTeams();
            } else {
                this.user = new User(await this.userDataService.getUserInfo(username));
                this.teams = await this.userDataService.getTeams(this.user._id);
            }
        } catch (error) {
            this.handleError(error);
        }
    }

}
