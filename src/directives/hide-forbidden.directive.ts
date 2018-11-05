import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AuthGroup} from '../models/authorization.types';
import {AuthService} from '../services/auth.service';

@Directive({
  selector: '[appHideForbidden]'
})
export class HideForbiddenDirective implements OnInit {

    @Input('appHideForbidden') appHideForbidden: AuthGroup; // Required appHideForbidden passed in
    constructor(private el: ElementRef, private authorizationService: AuthService) { }
    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.appHideForbidden)) {
            this.el.nativeElement.style.display = 'none';
        }
    }

}
