import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ClrWizard} from '@clr/angular';
import {User} from '../../../entities/User';

@Component({
    selector: 'app-add-tour-wizard',
    templateUrl: './add-tour-wizard.component.html',
    styleUrls: ['./add-tour-wizard.component.css']
})
export class AddTourWizardComponent implements OnInit {
    @ViewChild('tourWizard') tourWizard: ClrWizard;
    @Input() owner: User;
    wizardOpen: boolean;

    public openWizard() {
        this.wizardOpen = true;
    }


    constructor() {
    }

    ngOnInit() {
    }

    doFinish() {

    }

    doCancel() {
        this.doReset();
    }

    doReset() {
        this.tourWizard.reset();
    }
}
