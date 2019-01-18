import {Component, OnInit, ViewChild} from '@angular/core';
import {Tournament} from '../../entities/Tournament';
import {TournamentService} from '../../services/entity-data/tournament.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
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

    constructor(private tourService: TournamentService,
                private userService: LocalUserService) {
    }

    getTours(): Observable<any> {
        return this.tourService.getTours()
            .pipe(tap(tours => {
                    tours = tours.map(t => new Tournament(t));
                    this.tours = tours;
                }
            ));
    }

    async ngOnInit() {
        this.user = this.userService.getUser();
        this.getTours().subscribe();
        await this.userService.getSelectedTournaments();
    }

    search() {

    }

}
