import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClrWizard} from '@clr/angular';
import {TeamService} from '../../../services/entity-data/team.service';
import {User} from '../../../entities/User';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
    selector: 'app-add-team-wizard',
    templateUrl: './add-team-wizard.component.html',
    styleUrls: ['./add-team-wizard.component.css']
})

// TODO: async validation
export class AddTeamWizardComponent implements OnInit {
    @ViewChild('teamWizard') teamWizard: ClrWizard;
    @Input() captain: User;
    wizardOpen: boolean;

    nameForm = new FormGroup({
        name: new FormControl('', [Validators.required])
    });

    contactTypes = [
        {name: 'E-mail'},
        {name: 'Phone'},
        {name: 'Social network link'},
        {name: 'WhatsApp'},
        {name: 'Telegram'},
    ];

    idTypes = [
        {name: 'Username'},
        {name: 'Steam id'}
    ];

    contactsForm = new FormArray([]);

    playersForm = new FormArray([]);

    public openWizard() {
        this.wizardOpen = true;
    }

    addContact() {
        this.contactsForm.push(new FormGroup({
            contact_type: new FormControl(this.contactTypes[0].name),
            contact_value: new FormControl('', [Validators.required]),
        }));
    }

    addPlayer() {
        this.playersForm.push(
            new FormGroup(
                {
                    id_type: new FormControl(this.idTypes[0].name),
                    identifier: new FormControl('', {updateOn: 'blur', validators: [Validators.required]}),
                },
                [], [this.usernameExistsValidator()]
            )
        );
    }

    removeContact(i: number) {
        this.contactsForm.removeAt(i);
    }

    removePlayer(i: number) {
        this.playersForm.removeAt(i);
    }

    constructor(private teamService: TeamService, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
    }

    async doFinish() {
        const name = this.nameForm.value.name;
        console.log(name);
        const addedTeam = await this.teamService.addTeam(name);
        console.log(addedTeam);
        if (addedTeam !== null) {
            this.playersForm.controls.forEach(pf => {
                if (pf.value.id_type.toLowerCase() === 'username') {
                    this.teamService.invitePlayer(addedTeam, pf.value.identifier).then();
                }
            });
            this.doReset();
            this.displayAlert('Success');
        } else {
            this.displayAlert('Failure');
        }
    }

    doCancel() {
        this.doReset();
    }

    displayAlert(text: string) {
        console.log(text);
    }

    private doReset() {
        this.contactsForm.controls.length = 0;
        this.playersForm.controls.length = 0;
        this.nameForm.reset();
        this.contactsForm.reset();
        this.playersForm.reset();
        this.teamWizard.reset();
    }

    usernameExistsValidator(): AsyncValidatorFn {
        return async (control: FormGroup) => {
            let exists;
            if (control.get('id_type').value.toLowerCase() === 'username') {
                exists = await this.authenticationService.usernameExists(control.get('identifier').value);
                console.log(exists);
            } else {
                exists = true;
            }
            const errors = !exists ? {'noSuchUser': {value: control.get('identifier').value}} : null;
            control.get('identifier').setErrors(errors);
            return errors;
        };
    }
}
