import {Component, OnInit} from '@angular/core';
import {Tournament} from '../tournament';
import {TournamentService} from '../tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[];

  // tournament: Tournament = {
  //   id: 1,
  //   name: 'Windstorm',
  //   date: 'www',
  //   competitors: 10,
  //   owner: 'yo'
  // };

  constructor(private tournamentService: TournamentService) {
  }

  getTournaments(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  ngOnInit() {
    this.getTournaments();
  }

}
