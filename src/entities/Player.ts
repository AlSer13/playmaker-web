export class Player {
    account_id: Number;
    player_slot: Number;
    hero_id: Number;
    hero_name: String;
    item_0: Number;
    item_1: Number;
    item_2: Number;
    item_3: Number;
    item_4: Number;
    item_5: Number;
    backpack_0: Number;
    backpack_1: Number;
    backpack_2: Number;
    kills: Number;
    deaths: Number;
    assists: Number;
    last_hits: Number;
    denies: Number;
    gold_per_min: Number;
    xp_per_min: Number;
    level: Number;
    hero_damage: Number;
    tower_damage: Number;
    hero_healing: Number;
    gold: Number;
    gold_spent: Number;
    ability_upgrades: [{
        _id: false
        ability: Number
        time: Number
        level: Number
    }];
}
