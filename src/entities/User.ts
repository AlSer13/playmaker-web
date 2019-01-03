import {Team} from './Team';
import {Match} from './Match';
import {Tournament} from './Tournament';

export class User {
    _id: number;
    email: string;
    jid: string;
    accountId: number;
    invites: Team[];
    selectedMatches: number;
    selectedTournaments: number;
}
