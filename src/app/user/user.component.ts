import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../entities/User';
import {UserService} from '../../services/entity/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: User;
    _404 = false;

    constructor(private route: ActivatedRoute,
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
