import {Injectable} from '@angular/core';
import {AuthGroup} from '../models/authorization.types';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(protected router: Router,
                protected authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
        if (this.hasRequiredPermission(route.data['required'])) {
            return true;
        } else {
            if (!(this.authService.hasPermission('USER') || this.authService.hasPermission('VISITOR'))) {
                route.data['redirect'] = '/help';
            }
            this.router.navigate([route.data['redirect']]).then();
            return false;
        }
    }

    protected hasRequiredPermission(authGroup: AuthGroup): Promise<boolean> | boolean {
        console.log('GUARD' +
            '\nrequired: ' + authGroup +
            '\nhave: ' + this.authService.permissions);
        // If user’s permissions already retrieved from the API
        if (this.authService.permissions) {
            if (authGroup) {
                return this.authService.hasPermission(authGroup);
            } else {
                return this.authService.hasPermission(null);
            }
        } else {
            // Otherwise, must request permissions from the API first
            return new Promise<boolean>((resolve) => {
                this.authService.initializePermissions()
                    .then(() => {
                        if (authGroup) {
                            resolve(this.authService.hasPermission(authGroup));
                        } else {
                            resolve(this.authService.hasPermission(null));
                        }

                    }).catch(() => {
                    resolve(false);
                });
            });
        }
    }
}
