import {Team} from './Team';

export class User {
    _id: string;
    avatar: string;
    email: string;
    jid: string;
    accountId: number;
    username: string;
    invites: Team[];
    selectedMatches: number;
    selectedTournaments: number;

    equals(user: User): boolean {
        return this._id === user._id;
    }
}
