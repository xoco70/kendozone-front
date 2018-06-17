import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../models/tournament';
import {ActivatedRoute} from '@angular/router';
import {TreeService} from '../../services/tree.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss']
})
export class TreesComponent implements OnInit {

  tournament: Tournament;
  loading: boolean;
  slug: string;

  constructor(private treeService: TreeService,
              private route: ActivatedRoute) {
    this.slug = this.route.snapshot.params.slug;
  }


  getTournamentWithTrees(): Tournament {
    this.loading = true;
    this.treeService.getTournamentWithTrees(this.slug)
      .pipe(first())
      .subscribe(tournament => {
        this.tournament = tournament;
        console.log(this.tournament);
        console.log(this.tournament instanceof Tournament);
        console.log(this.tournament.championships);
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    return null;
  }


  ngOnInit() {
    this.getTournamentWithTrees();
  }

}
