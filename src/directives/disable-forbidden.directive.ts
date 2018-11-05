import {Directive, ElementRef, OnInit, Input} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AuthGroup} from '../models/authorization.types';

@Directive({
    selector: '[appDisableForbidden]'
})
export class DisableForbiddenDirective implements OnInit {
    @Input('appDisableForbidden') appDisableForbidden: AuthGroup; // Required appHideForbidden passed in
    constructor(private el: ElementRef, private authorizationService: AuthService) { }
    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.appDisableForbidden)) {
            this.el.nativeElement.disabled = true;
        }
    }
}
