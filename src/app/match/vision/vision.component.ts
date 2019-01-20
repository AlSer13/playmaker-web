import {Component, Input, OnInit} from '@angular/core';
import {ParsedMatch} from '../../../entities/ParsedMatch';
import {Options} from 'ng5-slider';

@Component({
    selector: 'vision',
    templateUrl: './vision.component.html',
    styleUrls: ['./vision.component.scss']
})
export class VisionComponent implements OnInit {

    @Input() parsedMatch: ParsedMatch;
    time: number = -65;
    options: Options;

    constructor() {
    }

    ngOnInit() {
        this.options = {
            floor: -65,
            ceil: this.parsedMatch.players[0].times.pop(),
            step: 5,
            translate: this.secondsToMMSS
        };
    }

    secondsToMMSS(seconds: number): string {
        return seconds > 0 ?
            new Date(1000 * seconds).toISOString().substr(14, 5) :
            '-' + new Date(1000 * -seconds).toISOString().substr(14, 5);
    }

}
