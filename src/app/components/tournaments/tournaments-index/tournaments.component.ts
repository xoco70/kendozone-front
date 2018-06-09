import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../../models/tournament';
import {TournamentService} from '../../../services/tournament.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[];
  page = 1;

  constructor(private tournamentService: TournamentService,
              private route: ActivatedRoute
  ) {
  }

  all(page?: number): void {
    this.tournamentService.all(page)
      .subscribe(tournaments => this.tournaments = tournaments);
    console.log(this.tournaments);
  }

  delete(tournament: Tournament): void {
    this.tournaments = this.tournaments['data'].filter(h => h !== tournament);
    this.tournamentService.delete(tournament).subscribe();
  }


  ngOnInit() {

    this.all();

  }

  pageChanged(page: number) {
    this.page = page;
    this.all(page);
  }

}
