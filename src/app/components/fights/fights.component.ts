import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {Tournament} from '../../models/tournament';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {FightService} from '../../services/fight.service';

@Component({
  selector: 'app-fights',
  templateUrl: './fights.component.html',
  styleUrls: ['./fights.component.scss']
})
export class FightsComponent implements OnInit {
  public loading = false;
  private slug: string;
  private tournament: Tournament;

  constructor(private fightService: FightService,
              private route: ActivatedRoute,
  ) {
    this.slug = this.route.snapshot.params.slug;

  }

  getTournamentWithFights(): Observable<Tournament> {
    this.loading = true;
    this.fightService.getTournamentWithFights(this.slug)
      .pipe(first())
      .subscribe(tournament => {
        this.tournament = plainToClass(Tournament, tournament);
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    return null;
  }

  ngOnInit() {
    this.getTournamentWithFights();
  }
}
