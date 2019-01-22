import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalUserService} from '../../services/local-user.service';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {


    constructor(private userService: LocalUserService) {
    }

    feedbackForm = new FormGroup({
        email: new FormControl(this.userService.getUser() && this.userService.getUser().email ?
            this.userService.getUser().email : '', [Validators.email, Validators.maxLength(100)]),
        message: new FormControl('', Validators.maxLength(2000))
    });

    ngOnInit() {
    }

    sendMessage() {
        console.log(this.feedbackForm.get('email').value, this.feedbackForm.get('message').value);
    }

}
