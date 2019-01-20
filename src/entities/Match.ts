import {User} from './User';
import {Player} from './Player';
import {Team} from './Team';

export class Match {
    _id: number;
    duration: number;
    start_time: number;
    tower_status_radiant: number;
    tower_status_dire: number;
    barracks_status_radiant: number;
    barracks_status_dire: number;
    radiant_score: number;
    dire_score: number;
    radiant_win: Boolean;
    radiant_team: Team;
    dire_team: Team;
    tournament: string;
    players: Player[];
}
