import {User} from './User';
import {Player} from './Player';

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
    radiant_team: string;
    dire_team: string;
    tournament: string;
    players: Player[];
}
