import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupComponent} from '../signup/signup.component';

@Component({
    selector: 'app-restore',
    templateUrl: './restore.component.html',
    styleUrls: ['./restore.component.css']
})
export class RestoreComponent implements OnInit {
    private restoreKey: string;


    restoreForm = new FormGroup({
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required, SignupComponent.passwordMatchValidator])
    });
    error: any;

    constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.restoreKey = this.route.snapshot.paramMap.get('restoreKey');
    }

    async confirmReset() {
        try {
            await this.authenticationService.confirmReset(this.restoreKey, this.restoreForm.get('password').value);
        } catch (e) {
            this.handleError(e);
        }
    }

    handleError(error) {
        switch (error.status) {
            case 503:
                error.statusText = 'Under construction';
                break;

            case 404: {
                error.statusText = 'Invalid link';
                error.omitStatus = true;
                break;
            }
        }
        this.error = error;
    }

}
