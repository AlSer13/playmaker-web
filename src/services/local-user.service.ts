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
        } else { return null; }
    }

    async getSelectedTournaments() {
        if (this.user._id) {
            if (!this.user.selectedTournaments) {
                await this.loadSelectedInfo();
            }
            return this.user.selectedTournaments;
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

    async loadSelectedInfo() {
        if (this.user._id) {
            const data = await this.userDataService.getUserInfo(this.user.username);
            this.user.selectedTournaments = data.selectedTournaments;
            this.user.selectedMatches = data.selectedMatches;
        } else {
            return null;
        }
    }

    async followTournament(tournament: Tournament) {
        if (this.user._id) {
            await this.userDataService.followTournament(tournament._id);
            await this.loadSelectedInfo();
        } else {
            return null;
        }
    }

    async unfollowTournament(tournament: Tournament) {
        if (this.user._id) {
            await this.userDataService.unfollowTournament(tournament._id);
            await this.loadSelectedInfo();
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
}
