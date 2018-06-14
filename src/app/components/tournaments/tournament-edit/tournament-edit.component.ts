import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Tournament} from '../../../models/tournament';
import {TournamentService} from '../../../services/tournament.service';

@Component({
  selector: 'app-tournament-edit-component',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.scss']
})
export class TournamentEditComponent implements OnInit {
  data: any;
  loading: boolean;
  slug: string;
  componentName: string;

  constructor(private tournamentService: TournamentService,
              private route: ActivatedRoute) {
    this.slug = this.route.snapshot.params.slug;
  }


  getTournament(): Tournament {
    this.loading = true;
    this.tournamentService.getTournament(this.slug)
      .subscribe(tournament => {
        this.data = tournament;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    return null;
  }

  ngOnInit() {
    this.componentName = this.route.snapshot.component.name;
    this.getTournament();
  }

}
