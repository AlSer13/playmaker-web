import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../../entities/Match';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

    @Input() match: Match;
    itemIconURL = environment.steamMediaURL + 'items/';
    heroIconURL = environment.steamMediaURL + '/heroes/';

    constructor() {
    }

    ngOnInit() {

    }

}
