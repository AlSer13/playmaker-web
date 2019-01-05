import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                protected router: Router) {
        //this.signUpForm.controls['username'].valueChanges.pipe(debounceTime(500), switchMap(this.usernameExistsValidator)).subscribe(x => console.log(x));
    }

    signUpForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5)], [this.usernameExistsValidator.bind(this)]),
        email: new FormControl('', [Validators.required, Validators.email], [this.emailExistsValidator.bind(this)]),
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

    // TODO: уменьшить частоту запросов (не на каждую нажатую клавишу)
    // custom Validators
    usernameExistsValidator(ctr: AbstractControl) {
        return ctr
            .valueChanges
            .pipe(
                debounceTime(800),
                distinctUntilChanged(),
                switchMap(_ => this.authenticationService.usernameExists(ctr.value)),
                map(x => x ? ctr.setErrors({'usernameExists': {value: ctr.value}}) : ctr.setErrors(null))
            );
    }

    emailExistsValidator(ctr: AbstractControl) {
        return ctr
            .valueChanges
            .pipe(
                debounceTime(800),
                distinctUntilChanged(),
                switchMap(_ => this.authenticationService.emailExists(ctr.value)),
                map(x => x ? ctr.setErrors({'emailExists': {value: ctr.value}}) : ctr.setErrors(null))
            );
    }
}
