import {Team} from './Team';
import {environment} from '../environments/environment';
import {User} from './User';
import {id} from '@swimlane/ngx-charts/release/utils';

export class Tournament {
    _id: string;
    name: string;
    teamCount: number;
    prizePool: number;
    description: string;
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
            this.started = json.started;
        }
    }

    getTeamNameById(id: string) {
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i]._id === id) return this.teams[i].name;
        }
    }

    getTeamById(id: string) {
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i]._id === id) return this.teams[i];
        }
    }

    // constructor() {
    //     this.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
    //         ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
    //         ' quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
    //         ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
    //         ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    //     this.ownerName = 'John Doe';
    // }
}
