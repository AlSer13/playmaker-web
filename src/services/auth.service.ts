import {Injectable} from '@angular/core';
import {AuthGroup} from '../models/authorization.types';
import {AuthorizationDataService} from './authorization-data.service';
import {User} from '../entities/User';

@Injectable()
export class AuthService {
    user: User;
    permissions: Array<AuthGroup>; // Store the actions for which this user has appHideForbidden


    constructor(private authorizationDataService: AuthorizationDataService) {
    }

    hasPermission(authGroup: AuthGroup): boolean {
        // console.log('required: ' + authGroup + '\npermissions: ' + this.permissions);
        return !!(this.user && this.permissions.find(permission => {
            return permission === authGroup;
        }));
    }

    async initializePermissions() {
        const data = await this.authorizationDataService.getPermissions();
        this.user = new User({
            username: data['username'],
            _id: data['userId']
        });
        this.permissions = data['authGroup'];
        console.log('Received permissions from server: ' + this.permissions + '\nFor user: ' + this.user.username);
    }
}
