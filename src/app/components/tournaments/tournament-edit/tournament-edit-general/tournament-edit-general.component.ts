import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../../../models/tournament';
import {TournamentService} from '../../../../services/tournament.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tournament-edit-general',
  templateUrl: './tournament-edit-general.component.html',
  styleUrls: ['./tournament-edit-general.component.scss']
})
export class TournamentEditGeneralComponent implements OnInit {
  tournament: Tournament;
  loading: boolean;
  slug: string;

  constructor(private tournamentService: TournamentService,
              private route: ActivatedRoute) {
    this.slug = this.route.snapshot.params.slug;
  }


  getTournament(): Tournament {
    this.loading = true;
    this.tournamentService.getTournament(this.slug)
      .subscribe(tournament => {
        this.tournament = tournament;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    return null;
  }

  ngOnInit() {
    this.getTournament();
  }

}
