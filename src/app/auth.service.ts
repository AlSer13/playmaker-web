import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authed = false;

    constructor() {
    }

    isAuthed() {
        return this.authed;
    }
}
