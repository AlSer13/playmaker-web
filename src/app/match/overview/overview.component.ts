import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../entities/Match';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    itemIconURL;
    abilityIconURL;

    @Input() match: Match;

    constructor() {
    }

    ngOnInit() {
        this.itemIconURL = environment.steamMediaURL + 'items/';
        this.abilityIconURL = environment.steamMediaURL + 'abilities/';
        console.log(1);
    }

    getAbilityIconUrl(name: string): string {
        if (name.match(/special_/)) return 'https://www.opendota.com/assets/images/dota2/talent_tree.svg';
        else return this.abilityIconURL + name + '_sm.png';
    }
}
