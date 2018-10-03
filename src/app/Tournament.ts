import {Team} from './Team';

export class Tournament {
    _id: string;
    name: string;
    team_count: number;
    prize_pool: number;
    teams: Team[];
}
