import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Playmaker';
    nav_components = [
        {
            text: 'Главная',
            link: '/main',

        },
        {
            text: 'Турниры',
            link: '/tournaments'
        },
        {
            text: 'Команды',
            link: '/teams'
        },
        {
            text: 'Помощь',
            link: '/help'
        }
    ];
}
