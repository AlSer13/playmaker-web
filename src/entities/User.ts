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

    public equals(user: User): boolean {
        return (user != null) && (this._id === user._id);
    }

    constructor(json: any) {
        this._id = json._id;
        this.avatar = json.avatar;
        this.email = json.email;
        this.jid = json.jid;
        this.accountId = json.accountId;
        this.username = json.username;
        this.invites = json.invites;
        this.selectedMatches = json.selectedMatches;
        this.selectedTournaments = json.selectedTournaments;
    }
}
