import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClrWizard} from '@clr/angular';
import {TeamService} from '../../../services/entity-data/team.service';
import {User} from '../../../entities/User';

@Component({
    selector: 'app-add-team-wizard',
    templateUrl: './add-team-wizard.component.html',
    styleUrls: ['./add-team-wizard.component.css']
})

// TODO: async validation
export class AddTeamWizardComponent implements OnInit {
    @ViewChild('teamWizard') teamWizard: ClrWizard;
    @Input() button_text: string;
    @Input() captain: User;
    teamWizardOpen: boolean;

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

    addContact() {
        this.contactsForm.push(new FormGroup({
            contact_type: new FormControl(this.contactTypes[0].name),
            contact_value: new FormControl('', [Validators.required]),
        }));
    }

    addPlayer() {
        this.playersForm.push(new FormGroup({
            id_type: new FormControl(this.idTypes[0].name),
            identifier: new FormControl('', [Validators.required]),
        }));
    }

    removeContact(i: number) {
        this.contactsForm.removeAt(i);
    }

    removePlayer(i: number) {
        this.playersForm.removeAt(i);
    }

    constructor(private teamService: TeamService) {
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
}
