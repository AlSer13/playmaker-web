import {User} from './User';
import {Player} from './Player';
import {ParsedPlayer} from './ParsedPlayer';

export class ParsedMatch {
    _id: number;
    radiant_gold_adv: number[];
    radiant_xp_adv: number[];
    players: ParsedPlayer[];
}
