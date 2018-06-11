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
  public loading = true;

  constructor(private tournamentService: TournamentService,
              private route: ActivatedRoute
  ) {
  }

  all(page?: number): void {
    this.loading = true;
    this.tournamentService.all(page)
      .subscribe(tournaments => {
        this.tournaments = tournaments;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  delete(tournament: Tournament): void {
    this.loading = true;
    this.tournaments['data'] = this.tournaments['data'].filter(h => h !== tournament);
    this.tournamentService.delete(tournament).subscribe();
    this.loading = false;
  }


  ngOnInit() {

    this.all();

  }

  pageChanged(page: number) {
    this.page = page;
    this.all(page);
  }
}
