import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ClrWizard} from '@clr/angular';
import {User} from '../../../entities/User';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TournamentService} from '../../../services/entity-data/tournament.service';
import {currencies} from '../../../models/currencies';

@Component({
    selector: 'app-add-tour-wizard',
    templateUrl: './add-tour-wizard.component.html',
    styleUrls: ['./add-tour-wizard.component.scss']
})
export class AddTourWizardComponent implements OnInit {


    constructor(private tourService: TournamentService) {
    }

    @ViewChild('tourWizard') tourWizard: ClrWizard;
    @Input() owner: User;
    wizardOpen: boolean;

    currencies = currencies;

    contactTypes = [
        {name: 'E-mail'},
        {name: 'Phone number'},
        {name: 'Social network link'},
        {name: 'WhatsApp'},
        {name: 'Telegram'},
    ];

    descriptionForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
    });

    parametersForm = new FormGroup({
        prizePool: new FormControl(0, Validators.pattern('(^[1-9][0-9]*)?(^0)?')),
        prizePoolCurrency: new FormControl(this.currencies[0]),
        teamCount: new FormControl('',
            [Validators.min(2),
                Validators.max(100), Validators.required, Validators.pattern('^[1-9][0-9]*')]),
        startWhenReady: new FormControl(false)
    });

    contactsForm = new FormArray([]);

    addContact() {
        this.contactsForm.push(new FormGroup({
            contact_type: new FormControl(this.contactTypes[0].name),
            contact_value: new FormControl('', [Validators.required]),
        }));
    }

    removeContact(i: number) {
        this.contactsForm.removeAt(i);
    }

    public openWizard() {
        this.wizardOpen = true;
    }

    ngOnInit() {
    }

    async doFinish() {
        const contacts = [];
        this.contactsForm.controls.forEach(contact => contacts.push({
            contactType: contact.value.contact_type,
            contactText: contact.value.contact_value
        }));
        const tourJSON = {
            name: this.descriptionForm.value.name,
            description: this.descriptionForm.value.description,
            prizePool: this.parametersForm.value.prizePool,
            prizePoolCurrency: this.parametersForm.value.prizePoolCurrency.name,
            teamCount: this.parametersForm.value.teamCount,
            startWhenReady: this.parametersForm.value.startWhenReady,
            contacts: contacts
        };
        const addedTour = await this.tourService.addTour(tourJSON);
        if (addedTour !== null) {
            this.doReset();
            this.displayAlert('Success');
        } else {
            this.doReset();
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
        this.descriptionForm.reset();
        this.parametersForm.reset();
        this.tourWizard.reset();
    }
}
