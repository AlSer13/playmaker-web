import {AfterViewInit, Component, OnInit, ElementRef, Input, ViewChild} from '@angular/core';
import {Tournament} from '../../../../entities/Tournament';
import {Router} from '@angular/router';
import {ClrModal} from '@clr/angular';
import {TournamentService} from '../../../../services/entity-data/tournament.service';
import {MatchService} from '../../../../services/entity-data/match.service';
import {LocalUserService} from '../../../../services/local-user.service';

declare let $: any;

@Component({
    selector: 'bracket',
    templateUrl: './bracket.component.html',
    styleUrls: ['./bracket.component.css']
})

export class BracketComponent implements OnInit, AfterViewInit {

    constructor(private matchService: MatchService, private userService: LocalUserService) {
    }

    basic: boolean = false;
    modalInfo: any;
    @Input() tournament: Tournament;
    matchId: string;
    winner: boolean;
    matchIdError: string = '';
    winnerError: string = '';
    isCaptain: boolean = false;
    isOwner: boolean = false;

    ngAfterViewInit() {
        this.generateBracket();
    }

    onclick(data) {
        this.winner = undefined;
        this.matchId = '';
        this.matchIdError = '';
        this.winnerError = '';
        let team1 = this.tournament.getTeamById(data.team1);
        let team2 = this.tournament.getTeamById(data.team2);

        console.log(team1);
        console.log(team2);

        this.isCaptain = this.userService.getUser().equals(team1.captain) || this.userService.getUser().equals(team2.captain);

        if (data.team1 && data.team2) {
            this.basic = true;
            this.modalInfo = data;
        }
        console.log(data);
    }

    async submitMatch() {
        if (!this.matchId.match(/^\d+$/)) {
            this.matchIdError = 'invalid match id';
        } else {
            this.matchIdError = '';
        }
        if (this.winner === undefined) {
            this.winnerError = 'choose winner';
        } else {
            this.winnerError = '';
        }

        console.log(2);
        console.log(this.winner);

        if (this.matchId.match(/^\d+$/) && this.winner !== undefined) {
            //TODO: Отлавливать 403 ошибку, если пытается отправить не капитан. Да и вообще у не капитанов убрать кнопку submit
            this.tournament = new Tournament(await this.matchService.submitMatch(this.matchId, this.tournament._id, this.modalInfo._id, this.winner));
            console.log(1);
            this.generateBracket();
        }
        this.basic = false;
    }

    ngOnInit() {
        this.isOwner = this.userService.getUser().equals(this.tournament.owner);
        console.log(this.tournament);
    }

    generateBracket() {
        let results = [];
        let stage = (this.tournament.bracket.length + 1) / 2;

        while (stage >= 1) {
            let stageResults = [];

            this.tournament.bracket.forEach((node) => {
                if (node.stage === stage) {
                    if (node.firstTeamWin !== undefined) {
                        let tmp = node.firstTeamWin ? [1, 0, node] : [0, 1, node];
                        stageResults.push(tmp);
                    } else stageResults.push([null, null, node]);
                }
            });

            results.push(stageResults);
            stage /= 2;
        }

        console.log(results);

        let data = {
            teams: this.tournament.bracket.map((node) => {
                let team1 = this.tournament.getTeamNameById(node.team1) || null;
                let team2 = this.tournament.getTeamNameById(node.team2) || null;
                return [team1, team2];
            }).slice(0, this.tournament.bracket[0].stage),

            results: results
        };

        $('#bracket').bracket({
            onMatchClick: this.onclick.bind(this),
            teamWidth: 80,
            centerConnectors: true,
            skipConsolationRound: true,
            init: data /* data to initialize the bracket with */
        });
    }
}
