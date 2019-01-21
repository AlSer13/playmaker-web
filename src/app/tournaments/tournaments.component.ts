import {Component, OnInit, ViewChild} from '@angular/core';
import {Tournament} from '../../entities/Tournament';
import {TournamentService} from '../../services/entity-data/tournament.service';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
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
    tours: Tournament[];
    user: User;

    public keyUp = new Subject<string>();

    private subscription: Subscription;

    constructor(private tourService: TournamentService,
                private userService: LocalUserService) {
    }


    async ngOnInit() {
        this.subscription = this.keyUp.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap(query => this.tourService.getTours(query))
        ).subscribe(result => {
            this.tours = result;
        });

        this.user = this.userService.getUser();
        this.tours = await this.tourService.getTours('');
        await this.userService.getSelectedTournaments();
    }

    search() {

    }

}
