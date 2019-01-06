import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../entities/User';
import {UserService} from '../../services/entity/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: User;
    _404 = false;
    you: boolean; // is it current users page?

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService,
                private router: Router) {
    }

    async ngOnInit() {
        const username = this.route.snapshot.paramMap.get('username');
        try {
            this.user = await this.userService.getUser(username);
        } catch (error) {
            this.handleError(error);
        }
        this.you = this.user.equals(this.authService.user);
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
