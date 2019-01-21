import {Component, OnInit, ViewChild} from '@angular/core';
import {Tournament} from '../../entities/Tournament';
import {TournamentService} from '../../services/entity-data/tournament.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {LocalUserService} from '../../services/local-user.service';
import {AddTourWizardComponent} from '../user/add-tour-wizard/add-tour-wizard.component';
import {User} from '../../entities/User';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

    @ViewChild('tourWizard') tourWizard: AddTourWizardComponent;
    tours: Tournament[] = [];
    user: User;
    query = '';
    limit = 4;

    scrollCallback;

    public keyUp = new Subject<string>();

    private subscription: Subscription;

    constructor(private tourService: TournamentService,
                private userService: LocalUserService) {
        this.scrollCallback = this.scroll.bind(this);
    }


    async ngOnInit() {
        this.subscription = this.keyUp.pipe(
            debounceTime(700),
            distinctUntilChanged(),
            switchMap(() => this.search())
        ).subscribe();

        this.user = this.userService.getUser();
        await this.userService.getSelectedTournaments();
    }

    scroll(): Observable<Tournament[]> {
        console.log('scroll');
        return this.tourService.getTours(this.query, this.tours.length, this.limit)
            .pipe(tap((tours) => this.tours = this.tours.concat(tours)));
    }

    search(): Observable<Tournament[]> {
        console.log('search');
        return this.tourService.getTours(this.query, 0, this.limit)
            .pipe(tap((tours) => this.tours = tours));
    }

}
