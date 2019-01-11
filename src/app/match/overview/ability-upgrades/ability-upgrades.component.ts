import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../../entities/Match';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'ability-upgrades',
    templateUrl: './ability-upgrades.component.html',
    styleUrls: ['./ability-upgrades.component.css']
})
export class AbilityUpgradesComponent implements OnInit {

    @Input() match: Match;
    abilityIconURL = environment.steamMediaURL + 'abilities/';
    heroIconURL = environment.steamMediaURL + '/heroes/';

    constructor() {
    }

    ngOnInit() {

    }

    getAbilityIconUrl(name: string): string {
        if (name.match(/special_/)) return 'https://www.opendota.com/assets/images/dota2/talent_tree.svg';
        else return this.abilityIconURL + name + '_sm.png';
    }
}
