import {Component, OnInit} from '@angular/core';
import {LocalUserService} from '../../../services/local-user.service';
import {AuthService} from '../../../services/auth.service';
import {Tournament} from '../../../entities/Tournament';
import {Match} from '../../../entities/Match';

@Component({
    selector: 'app-user-subscriptions',
    templateUrl: './user-subscriptions.component.html',
    styleUrls: ['./user-subscriptions.component.scss']
})
export class UserSubscriptionsComponent implements OnInit {
    error: any;
    selectedTournaments: Tournament[];
    selectedMatches: Match[];

    constructor(private userService: LocalUserService, private authService: AuthService) {
    }

    async ngOnInit() {
        if (!this.authService.hasPermission('USER')) {
            this.error = {
                status: 401,
                statusText: 'Unauthorized'
            };
        } else {
            this.selectedTournaments = await this.userService.getSelectedTournaments();
            this.selectedMatches = await this.userService.getSelectedMatches();
        }
    }

}
