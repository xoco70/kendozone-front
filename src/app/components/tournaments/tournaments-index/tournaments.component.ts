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
  constructor(private tournamentService: TournamentService) {
  }

  getTournaments(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments['data']);
  }

  ngOnInit() {
    this.getTournaments();
  }

}
