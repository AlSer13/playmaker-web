import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    logged = false;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.logged = this.authService.hasPermission('USER');
    }

}
