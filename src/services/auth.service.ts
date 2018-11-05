import {Injectable} from '@angular/core';
import {AuthGroup} from '../models/authorization.types';
import {AuthorizationDataService} from './authorization-data.service';

@Injectable()
export class AuthService {
    permissions: Array<string>; // Store the actions for which this user has appHideForbidden
    constructor(private authorizationDataService: AuthorizationDataService) {
    }

    hasPermission(authGroup: AuthGroup): boolean {
        // console.log('required: ' + authGroup + '\npermissions: ' + this.permissions);
        return !!(this.permissions && this.permissions.find(permission => {
            return permission === authGroup;
        }));
    }

    initializePermissions() {
        return new Promise((resolve, reject) => {
            // Call API to retrieve the list of actions this user is permitted to perform.
            // In this case, the method returns a Promise, but it could have been implemented as an Observable
            this.authorizationDataService.getPermissions()
                .then(permissions => {
                    this.permissions = permissions;
                    resolve();
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }
}
