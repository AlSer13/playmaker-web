import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClrWizard} from '@clr/angular';

@Component({
    selector: 'app-add-team-wizard',
    templateUrl: './add-team-wizard.component.html',
    styleUrls: ['./add-team-wizard.component.css']
})
export class AddTeamWizardComponent implements OnInit {
    @ViewChild('teamWizard') teamWizard: ClrWizard;
    @Input() button_text: string;
    @Input() captain_name: string;
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

    constructor() {
    }

    ngOnInit() {
    }

    doFinish() {
        this.doReset();
    }

    doCancel() {
        this.doReset();
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
