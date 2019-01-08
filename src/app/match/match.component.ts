import {Component, OnInit} from '@angular/core';
import {Match} from '../../entities/Match';
import {MatchService} from '../../services/entity/match.service';
import * as shape from 'd3-shape';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
    shape = shape;
    view: any[] = [800, 400];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Time';
    showYAxisLabel = true;
    yAxisLabel = 'Gold';
    data: any[] = [];
    match: Match;
    colorScheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
        ]
    };

    constructor(private matchService: MatchService) {
    }

    async ngOnInit() {
        this.match = await this.matchService.getMatch(4245832190);
        console.log(this.match);
        this.data = this.match.players.map((item, i) => {
            return {
                name: item.player_slot,
                series: item.gold_t.map((item, i) => {
                    return {
                        name: i * 60,
                        value: item
                    };
                })
            }
        });
    }

}
