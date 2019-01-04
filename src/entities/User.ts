import {Team} from './Team';

export class User {
    _id: number;
    avatar: string;
    email: string;
    jid: string;
    accountId: number;
    username: string;
    invites: Team[];
    selectedMatches: number;
    selectedTournaments: number;
}
