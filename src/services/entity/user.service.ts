import {Injectable} from '@angular/core';
import {User} from '../../entities/User';
import {Tournament} from '../../entities/Tournament';
import {UserDataService} from '../data/user-data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: User;

    initUser(json: { _id: any; username: any }) {
        this.user = new User(json);
    }

    getUser(): User {
        if (this.user != null) {
            return this.user;
        }
    }

    async getSelectedTournaments() {
        if (!this.user.selectedTournaments) {
            await this.loadSelectedInfo();
        }
        return this.user.selectedTournaments;
    }

    constructor(private userDataService: UserDataService) {
    }

    async getInvites() {
        if (!this.user.invites) {
            this.user.invites = await this.userDataService.getInvites();
        }
        return this.user.invites;
    }

    async loadSelectedInfo() {
        const data = await this.userDataService.getUserInfo(this.user.username);
        this.user.selectedTournaments = data.selectedTournaments;
        this.user.selectedMatches = data.selectedMatches;
    }

    async followTournament(tournament: Tournament) {
        await this.userDataService.followTournament(tournament._id);
    }

    unfollowTournament(tournament: Tournament) {

    }
}
