import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../entities/Match';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    @Input() match: Match;

    constructor() {
    }

    ngOnInit() {
    }
}
