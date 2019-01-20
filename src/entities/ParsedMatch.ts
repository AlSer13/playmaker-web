import {User} from './User';
import {Player} from './Player';
import {ParsedPlayer} from './ParsedPlayer';

export class ParsedMatch {
    _id: number;
    radiant_gold_adv: number[];
    radiant_xp_adv: number[];
    radiant_obs_log: WardPosition[];
    dire_obs_log: WardPosition[];
    players: ParsedPlayer[];

    constructor(json: ParsedMatch) {
        this._id = json._id;
        this.radiant_gold_adv = json.radiant_gold_adv;
        this.radiant_xp_adv = json.radiant_xp_adv;
        this.players = json.players;
        this.radiant_obs_log = [];
        this.players.filter((player) => {
            return player.player_slot < 5;
        }).forEach((player) => {
            this.radiant_obs_log = this.radiant_obs_log.concat(player.obs_log);
        });

        this.dire_obs_log = [];
        this.players.filter((player) => {
            return player.player_slot > 4;
        }).forEach((player) => {
            this.dire_obs_log = this.dire_obs_log.concat(player.obs_log);
        });

        console.log(this.radiant_obs_log);
        console.log(this.dire_obs_log);
    }
}

class WardPosition {
    x: number;
    y: number;
    time: number;
}
