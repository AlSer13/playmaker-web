import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {User} from '../../entities/User';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: User;

    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        const username = this.route.snapshot.paramMap.get('username');
        this.userService.getUser(username)
            .subscribe(user => this.user = user);
    }

}
