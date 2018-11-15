import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../entities/Tournament';

@Component({
    selector: 'app-tournament-card',
    templateUrl: './tournament-card.component.html',
    styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

    @Input() tournament: Tournament;

    constructor() {
    }

    ngOnInit() {
    }

}
