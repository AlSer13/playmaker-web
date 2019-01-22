import {Team} from './Team';
import {User} from './User';
import {getCurrencyByName} from '../models/currencies';

export class Tournament {
    _id: string;
    name: string;
    teamCount: number;
    prizePool: number;
    prizePoolCurrency: any;
    description: string;
    winnerTeam: Team;
    owner: User;
    teams: Team[];
    started: boolean;
    finished: boolean;
    bracket: [{
        _id: number,
        team1: string,
        team2: string,
        stage: number,
        parentMatch: number,
        finished: boolean,
        matchId: number,
        firstTeamWin: boolean,
    }];

    constructor(json: any) {
        if (json != null) {
            this._id = json._id;
            this.name = json.name;
            this.teamCount = json.teamCount;
            this.prizePool = json.prizePool;
            this.description = json.description;
            this.owner = new User(json.owner);
            this.teams = json.teams;
            this.bracket = json.bracket;
            this.winnerTeam = json.winnerTeam;
            this.started = json.started;
            this.prizePoolCurrency = getCurrencyByName(json.prizePoolCurrency);
        }
    }

    getTeamNameById(id: string) {
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i]._id === id) { return this.teams[i].name; }
        }
    }

    getTeamById(id: string) {
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i]._id === id) { return this.teams[i]; }
        }
    }
}
