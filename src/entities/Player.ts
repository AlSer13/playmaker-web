export class Player {
    _id: false;
    account_id: number;
    player_slot: number;
    hero_id: number;
    hero_name: String;
    nickname: string;
    item_0: any;
    item_1: any;
    item_2: any;
    item_3: any;
    item_4: any;
    item_5: any;
    items: any[];
    backpack_0: any;
    backpack_1: any;
    backpack_2: any;
    kills: number;
    deaths: number;
    assists: number;
    last_hits: number;
    denies: number;
    gold_per_min: number;
    xp_per_min: number;
    level: number;
    hero_damage: number;
    tower_damage: number;
    hero_healing: number;
    gold: number;
    gold_spent: number;
    ability_upgrades: [{
        name: string,
        ability: number,
        time: number,
        level: number
    }];
}

