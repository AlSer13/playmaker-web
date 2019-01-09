import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
    @Input()
    error = {status: 404, statusText: 'Not found'};

    constructor() {
    }

    ngOnInit() {
    }

}
