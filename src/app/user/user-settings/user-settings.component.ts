import {Component, OnInit} from '@angular/core';
import {User} from '../../../entities/User';
import {LocalUserService} from '../../../services/local-user.service';
import {AuthService} from '../../../services/auth.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ClrLoadingState} from '@clr/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupComponent} from '../../signup/signup.component';

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
    avatarUrl;
    emailHelper = 'Enter your e-mail';

    updateForm = new FormGroup({
        avatar: new FormControl(),
        email: new FormControl('', [Validators.required, Validators.email]),
        jid: new FormControl('', [Validators.email]),
        currentPassword: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl('', [SignupComponent.passwordMatchValidator])
    });

    constructor(private userService: LocalUserService,
                private authService: AuthService,
                private authenticationService: AuthenticationService) {
    }

    async ngOnInit() {
        if (this.authService.hasPermission('USER')) {
            await this.userService.loadExtraInfo();
            this.user = this.userService.getUser();
            this.avatarUrl = this.user.avatar;
            this.updateForm.controls['jid'].patchValue(this.user.jid);
            this.updateForm.controls['email'].patchValue(this.user.email);
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
        const emailExist = await this.authenticationService.emailExists(this.updateForm.get('email').value);
        if (!emailExist ||
            this.user.email === this.updateForm.get('email').value) {
            this.updateBtnState = ClrLoadingState.LOADING;
            await this.userService.updateUser(this.avatar,
                this.updateForm.get('jid').value,
                this.updateForm.get('email').value,
                this.updateForm.get('currentPassword').value,
                this.updateForm.get('password').value);
            // this.user.avatar;
            this.updateBtnState = ClrLoadingState.SUCCESS;
            this.emailHelper = 'Enter your e-mail';
        } else {
            this.updateForm.controls['email'].setErrors({'emailExists': {value: 123}});
            this.emailHelper = 'Email is already used';
        }
    }

    onFileSelected(event) {
        this.avatar = <File>event.target.files[0];
        const reader = new FileReader();
        reader.onload = (_event) => {
            this.avatarUrl = _event.target.result;
        };
        reader.readAsDataURL(this.avatar);
    }
}
