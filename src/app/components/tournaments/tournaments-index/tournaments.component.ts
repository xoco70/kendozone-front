import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../../models/tournament';
import {TournamentService} from '../../../services/tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[];
  itemsPerPage: number;
  totalItems: any;
  page: any;
  previousPage: any;

  constructor(private tournamentService: TournamentService,
              ) {
  }

  getTournaments(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  ngOnInit() {

    this.getTournaments();
    // this.totalItems = this.tournaments['meta'].total;
  }

}
