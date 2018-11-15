import {Team} from './Team';

export class Tournament {
    _id: string;
    name: string;
    team_count: number;
    prize_pool: number;
    description: string;
    owner: string;
    teams: Team[];
    // description: string;
    //
    // constructor() {
    //     this.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
    //         ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
    //         ' quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
    //         ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
    //         ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    //     this.ownerName = 'John Doe';
    // }
}
