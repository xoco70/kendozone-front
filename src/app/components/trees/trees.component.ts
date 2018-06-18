import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../models/tournament';
import {ActivatedRoute} from '@angular/router';
import {TreeService} from '../../services/tree.service';
import {first} from 'rxjs/operators';
import {Championship} from '../../models/championship';
import {Observable} from 'rxjs';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss']
})
export class TreesComponent implements OnInit {

  myTournament = {};
  tournament: Tournament;
  championships: Championship[];
  loading: boolean;
  slug: string;

  constructor(private treeService: TreeService,
              private route: ActivatedRoute,
  ) {
    this.slug = this.route.snapshot.params.slug;

  }


  getTournamentWithTrees(): Observable<Tournament> {
    this.loading = true;
    this.treeService.getTournamentWithTrees(this.slug)
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
    this.myTournament = new Tournament();
    this.getTournamentWithTrees();
  }

}
