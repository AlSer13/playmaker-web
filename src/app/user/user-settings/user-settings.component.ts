import {Component, OnInit} from '@angular/core';
import {User} from '../../../entities/User';
import {LocalUserService} from '../../../services/local-user.service';
import {AuthService} from '../../../services/auth.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ClrLoadingState} from '@clr/angular';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
    user: User;
    error: any;
    loading = false;
    updateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    avatar: File = null;

    constructor(private userService: LocalUserService,
                private authService: AuthService,
                private authenticationService: AuthenticationService) {
    }

    async ngOnInit() {
        if (this.authService.hasPermission('USER')) {
            this.user = this.userService.getUser();
        } else {
            this.error = {
                status: 401,
                statusText: 'Unauthorized'
            };
        }
    }

    connectSteam() {
        this.authenticationService.connectSteam();
    }

    async disconnectSteam() {
        this.user = await this.authenticationService.disconnectSteam(); // TODO: сделать через LocalUserService
    }

    async updateUserInfo() {
        this.updateBtnState = ClrLoadingState.LOADING;
        await this.userService.updateUser(this.avatar);
        this.updateBtnState = ClrLoadingState.SUCCESS;
    }

    onFileSelected(event) {
        this.avatar = <File>event.target.files[0];
        console.log(event);
    }
}
