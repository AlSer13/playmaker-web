import {Injectable} from '@angular/core';
import {AuthGroup} from '../models/authorization.types';
import {AuthorizationDataService} from './authorization-data.service';

@Injectable()
export class AuthService {
    permissions: Array<string>; // Store the actions for which this user has appHideForbidden
    username: string;
    userId: string;

    constructor(private authorizationDataService: AuthorizationDataService) {
    }

    hasPermission(authGroup: AuthGroup): boolean {
        // console.log('required: ' + authGroup + '\npermissions: ' + this.permissions);
        return !!(this.permissions && this.permissions.find(permission => {
            return permission === authGroup;
        }));
    }

    async initializePermissions() {
        const data = await this.authorizationDataService.getPermissions();
        this.permissions = data['authGroup'];
        this.username = data['username'];
        this.userId = data['userId'];
        console.log('Received permissions from server: ' + this.permissions + '\nFor user: ' + this.username);
    }
}
