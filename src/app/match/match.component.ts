import {Component, OnInit} from '@angular/core';
import {Match} from '../../entities/Match';
import {MatchService} from '../../services/entity-data/match.service';
import * as shape from 'd3-shape';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../entities/Player';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
    heroIconURL = environment.heroIconURL;
    selectedPlayer: Player;
    matchId;
    shape = shape;
    view: any[] = [800, 400];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Time';
    showYAxisLabel = true;
    gold_data: any[] = [];
    exp_data: any[] = [];
    match: Match;
    colorScheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#392aca', '#00ffbc', '#9e0c98', '#e7ff00', '#f15903', '#ff63c1', '#93c03e', '#45a3c0', '#03871d', '#7e5610'
        ]
    };

    constructor(private matchService: MatchService, private route: ActivatedRoute) {
    }

    async ngOnInit() {
        this.matchId = this.route.snapshot.paramMap.get('matchId');
        this.match = await this.matchService.getMatch(this.matchId);
        this.selectedPlayer = this.match.players[0];
        this.gold_data = this.match.players.map((item) => {
            return {
                name: item.hero_name,
                series: item.gold_t.map((_item, i) => {
                    return {
                        name: i * 60,
                        value: _item
                    };
                })
            };
        });
        this.exp_data = this.match.players.map((item) => {
            return {
                name: item.hero_name,
                series: item.xp_t.map((_item, i) => {
                    return {
                        name: i * 60,
                        value: _item
                    };
                })
            };
        });
    }

    toUnderscored(string: string): string {
        return string.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    sample(tick: any) {
        let time = +tick;
        return `${Math.floor(time / 60)}:${time % 60}`;
    }


}
