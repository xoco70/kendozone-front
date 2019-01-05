import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../models/tournament';
import {ActivatedRoute} from '@angular/router';
import {TreeService} from '../../services/tree.service';
import {first} from 'rxjs/operators';
import {Championship} from '../../models/championship';
import {Observable} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss']
})
export class TreesComponent implements OnInit {
  tournament: Tournament;
  championships: Championship[];
  slug: string;

  constructor(private navbar: NavService,
              private treeService: TreeService,
              private route: ActivatedRoute,
  ) {
    this.slug = this.route.snapshot.params.slug;

  }

  generateTree(championship) {
    this.navbar.setLoading(true);
    this.treeService.store(championship)
      .pipe(first())
      .subscribe(
        tournament => {
          this.navbar.setLoading(false);
          this.tournament = plainToClass(tournament, Tournament);
        },
        error => {
          this.navbar.setLoading(false);
        });

  }

  getTournamentWithTrees(): Observable<Tournament> {
    this.navbar.setLoading(true);
    this.treeService.getTournamentWithTrees(this.slug)
      .pipe(first())
      .subscribe(tournament => {
        console.log(tournament);
        this.tournament = plainToClass(Tournament, tournament);
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
    return null;
  }


  ngOnInit() {
    setTimeout(() => {
      this.getTournamentWithTrees();
    });
  }
}
