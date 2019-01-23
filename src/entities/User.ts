import {Team} from './Team';
import {environment} from '../environments/environment';
import {Tournament} from './Tournament';
import {Match} from './Match';

export class User {
    _id: string;
    avatar: string;
    email: string;
    jid: string;
    accountId: number;
    username: string;
    invites: Team[];
    selectedMatches: Match[];
    selectedTournaments: Tournament[];
    confirmed: boolean;

    teams: Team[];

    public equals(user: User): boolean {
        return (user != null) && (this._id === user._id);
    }

    constructor(json: any) {
        if (json != null) {
            this._id = json._id;
            this.avatar = environment.avatarURL + json.username;
            this.email = json.email;
            this.jid = json.jid;
            this.accountId = json.accountId;
            this.username = json.username;
            this.invites = json.invites;
            this.selectedMatches = json.selectedMatches;
            this.selectedTournaments = json.selectedTournaments;
            this.confirmed = json.confirmed;
        }
    }
}
