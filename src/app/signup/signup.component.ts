import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                protected router: Router) {
    }

    signUpForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5)], [this.usernameExistsValidator()]),
        email: new FormControl('', [Validators.required, Validators.email], [this.emailExistsValidator()]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required, SignupComponent.passwordMatchValidator])
    });

    static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        if (control.parent) {
            return (control.parent.get('confirmPassword').value !== control.parent.get('password').value) ? {'mismatch': true} : null;
        }
    }

    ngOnInit() {
        this.signUpForm.get('password').valueChanges.subscribe(() => {
                this.signUpForm.get('confirmPassword').updateValueAndValidity();
            }
        );
    }

    async submit() {
        const data = await this.authenticationService.signUp(this.signUpForm.get('username').value,
            this.signUpForm.get('email').value,
            this.signUpForm.get('password').value);
        if (data) {
            // TODO: app level alert: success
            this.router.navigate(['/login']);
        }
    }

    // custom Validators
    usernameExistsValidator(): AsyncValidatorFn {
        return async (control: AbstractControl): Promise<ValidationErrors> => {
            const forbidden = await this.authenticationService.usernameExists(control.value);
            return forbidden ? {'usernameExists': {value: control.value}} : null;
        };
    }

    emailExistsValidator(): AsyncValidatorFn {
        return async (control: AbstractControl): Promise<ValidationErrors> => {
            const forbidden = await this.authenticationService.emailExists(control.value);
            return forbidden ? {'emailExists': {value: control.value}} : null;
        };
    }
}
