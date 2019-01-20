import {Injectable} from '@angular/core';
import {User} from '../entities/User';
import {Tournament} from '../entities/Tournament';
import {UserDataService} from './entity-data/user-data.service';

@Injectable({
    providedIn: 'root'
})
export class LocalUserService {

    private user: User;

    initUser(json: { _id: any; username: any }) {
        this.user = new User(json);
    }

    getUser(): User {
        if (this.user) {
            return this.user;
        } else {
            return null;
        }
    }

    async getSelectedTournaments() {
        if (this.user._id) {
            if (!this.user.selectedTournaments) {
                await this.loadExtraInfo();
            }
            return this.user.selectedTournaments;
        } else {
            return null;
        }
    }

    async getSelectedMatches() {
        if (this.user._id) {
            if (!this.user.selectedMatches) {
                await this.loadExtraInfo();
            }
            return this.user.selectedMatches;
        } else {
            return null;
        }

    }

    constructor(private userDataService: UserDataService) {
    }

    async getInvites() {
        if (this.user._id) {
            if (!this.user.invites) {
                this.user.invites = await this.userDataService.getInvites();
            }
            return this.user.invites;
        } else {
            return null;
        }
    }

    async followTournament(tournament: Tournament) {
        if (this.user._id) {
            await this.userDataService.followTournament(tournament._id);
            await this.loadExtraInfo();
        } else {
            return null;
        }
    }

    async unfollowTournament(tournament: Tournament) {
        if (this.user._id) {
            await this.userDataService.unfollowTournament(tournament._id);
            await this.loadExtraInfo();
        } else {
            return null;
        }

    }

    async getTeams() {
        if (this.user._id) {
            if (!this.user.teams) {
                this.user.teams = await this.userDataService.getTeams(this.user._id);
            }
            return this.user.teams;
        } else {
            return null;
        }
    }

    async loadExtraInfo() {
        if (this.user._id) {
            const data = await this.userDataService.getUserInfo(this.user.username);
            this.user.selectedTournaments = data.selectedTournaments;
            this.user.selectedMatches = data.selectedMatches;
            this.user.jid = data.jid;
            this.user.accountId = data.accountId;
            this.user.email = data.email;
        } else {
            return null;
        }
    }

    async updateUser(avatar: File) {
        const user = await this.userDataService.updateUser(this.user, avatar);
        console.log(user);
        // TODO: update cached info
        this.user.avatar = user.avatar;
        this.user.jid = user.jid;
        return user;
    }
}
