import {Component, OnInit} from '@angular/core';
import {Match} from '../../entities/Match';
import {MatchService} from '../../services/entity-data/match.service';
import * as shape from 'd3-shape';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../entities/Player';
import {environment} from '../../environments/environment';
import {ParsedMatch} from '../../entities/ParsedMatch';
import {ParsedPlayer} from '../../entities/ParsedPlayer';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
    heroIconURL = environment.steamMediaURL + '/heroes/';
    selectedPlayer: ParsedPlayer;
    matchId;
    shape = shape;
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    gold_data: any[] = [];
    exp_data: any[] = [];
    team_adv: any[] = [];
    match: Match;
    parsedMatch: ParsedMatch;
    zeroLine: any[] = [{
        name: '',
        value: 0
    }];

    playerGraphScheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#392aca', '#00ffbc', '#9e0c98', '#e7ff00', '#f15903', '#ff63c1', '#93c03e', '#45a3c0', '#03871d', '#7e5610'
        ]
    };

    teamGraphScheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#cabf3f', '#45ebff'
        ]
    };

    constructor(private matchService: MatchService, private route: ActivatedRoute) {
    }

    async ngOnInit() {
        this.matchId = this.route.snapshot.paramMap.get('matchId');
        this.match = await this.matchService.getMatch(this.matchId);
        this.parsedMatch = new ParsedMatch(await this.matchService.getParsedMatch(this.matchId));
        this.selectedPlayer = this.parsedMatch.players[0];
        this.gold_data = this.parsedMatch.players.map((item) => {
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
        this.exp_data = this.parsedMatch.players.map((item) => {
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
        this.team_adv = [{
            name: 'Gold',
            series: this.parsedMatch.radiant_gold_adv.map((item, i) => {
                return {
                    name: i * 60,
                    value: item
                };
            })
        }, {
            name: 'Exp',
            series: this.parsedMatch.radiant_xp_adv.map((item, i) => {
                return {
                    name: i * 60,
                    value: item
                };
            })
        }];
    }

    toUnderscored(string: string): string {
        return string.split(/(?=[A-Z])/).join('_').replace('__', '_').toLowerCase();
    }

    tickFormating(tick: any) {
        const time = +tick;
        return `${Math.floor(time / 60)}:${time % 60}`;
    }


}
