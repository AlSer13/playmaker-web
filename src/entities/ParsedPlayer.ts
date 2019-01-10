export class ParsedPlayer {

    hero_name: String;
    times: number[];
    gold_t: number[];
    lh_t: number[];
    dn_t: number[];
    xp_t: number[];
    player_slot: number;
    obs_placed: number;
    sen_placed: number;
    rune_pickups: number;
    towers_killed: number;
    roshans_killed: number;
    pos: [{
        x: number,
        y: number,
        value: number
    }];
    obs_log: [{
        time: number,
        x: number,
        y: number
    }];

}
