import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../entities/User';
import {UserService} from '../../services/entity/user.service';
import {AuthService} from '../../services/auth.service';
import {Team} from '../../entities/Team';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: User;
    teams: Team[];
    _404 = false;
    you: boolean; // is it current users page?

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService) {

        // subscribe on route change
        route.params.forEach(params => {
            this.initData(params['username']);
        }).then();
    }

    ngOnInit() {
        const username = this.route.snapshot.paramMap.get('username');
        this.initData(username).then();
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

    async initData(username: string) {
        try {
            this.user = new User(await this.userService.getUserInfo(username));
            this.teams = await this.userService.getTeams(this.user._id);
            this.you = this.user.equals(this.userService.user);
        } catch (error) {
            this.handleError(error);
        }
    }

}
