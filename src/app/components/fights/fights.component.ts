import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {Tournament} from '../../models/tournament';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {FightService} from '../../services/fight.service';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-fights',
  templateUrl: './fights.component.html',
  styleUrls: ['./fights.component.scss']
})
export class FightsComponent implements OnInit {
  private slug: string;
  public tournament: Tournament;

  constructor(private navbar: NavService,
              private fightService: FightService,
              private route: ActivatedRoute,
  ) {
    this.slug = this.route.snapshot.params.slug;

  }

  getTournamentWithFights(): Observable<Tournament> {
    this.navbar.setLoading(true);
    this.fightService.getTournamentWithFights(this.slug)
      .pipe(first())
      .subscribe(tournament => {
        this.tournament = plainToClass(Tournament, tournament);
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
    return null;
  }

  ngOnInit() {
    setTimeout(() => {
      this.getTournamentWithFights();
    });
  }
}
