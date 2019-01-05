import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../models/tournament';
import {TournamentService} from '../../../services/tournament.service';
import {NavService} from '../../../services/nav.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[];
  page = 1;

  constructor(private tournamentService: TournamentService,
              private navbar: NavService
  ) {
  }

  all(page?: number): void {
    this.navbar.setLoading(true);
    this.tournamentService.all(page)
      .subscribe(tournaments => {
        this.tournaments = tournaments;
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
  }

  delete(tournament: Tournament): void {
    this.navbar.setLoading(true);
    this.tournaments['data'] = this.tournaments['data'].filter(h => h !== tournament);
    this.tournamentService.delete(tournament).subscribe();
    this.navbar.setLoading(false);
  }


  ngOnInit() {
    setTimeout(() => {
      this.all();
    });

  }

  pageChanged(page: number) {
    this.page = page;
    this.all(page);
  }
}
