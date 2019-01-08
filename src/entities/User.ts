import {Team} from './Team';
import {environment} from '../environments/environment';
import {Tournament} from './Tournament';

export class User {
    _id: string;
    avatar: string;
    email: string;
    jid: string;
    accountId: number;
    username: string;
    invites: Team[];
    selectedMatches: number;
    selectedTournaments: Tournament[];

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
        }
    }
}
