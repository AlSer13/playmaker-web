import {Component, OnInit, ViewChild} from '@angular/core';
import {Tournament} from '../../entities/Tournament';
import {TournamentService} from '../../services/entity-data/tournament.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {LocalUserService} from '../../services/local-user.service';
import {AddTourWizardComponent} from '../user/add-tour-wizard/add-tour-wizard.component';
import {User} from '../../entities/User';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

    @ViewChild('tourWizard') tourWizard: AddTourWizardComponent;
    tours: Tournament[] = [];
    user: User;
    query = '';
    limit = 4;

    scrollCallback;
    continueScrolling = new Subject<boolean>();

    public keyUp = new Subject<string>();

    filterGroup = new FormGroup({
            tourStatus: new FormControl('all')
        }
    );

    constructor(private tourService: TournamentService,
                private userService: LocalUserService) {
        this.scrollCallback = this.scroll.bind(this);
    }


    async ngOnInit() {
        this.keyUp.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(() => this.search())
        ).subscribe();

        this.filterGroup.valueChanges.pipe(
            switchMap(() => this.search())
        ).subscribe();

        this.user = this.userService.getUser();
        await this.userService.getSelectedTournaments();
    }

    scroll(): Observable<Tournament[]> {
        const filters = {
            tourStatus: this.filterGroup.get('tourStatus').value,
        };
        return this.tourService.getTours(this.query, this.tours.length, this.limit, filters)
            .pipe(tap((tours) => {
                if (tours.length !== 0) {
                    this.tours = this.tours.concat(tours);
                } else {
                    this.continueScrolling.next(false);
                }
            }));
    }

    search(): Observable<Tournament[]> {
        this.continueScrolling.next(true);
        const filters = {
            tourStatus: this.filterGroup.get('tourStatus').value,
        };
        return this.tourService.getTours(this.query, 0, this.limit, filters)
            .pipe(tap((tours) => this.tours = tours));
    }

}
