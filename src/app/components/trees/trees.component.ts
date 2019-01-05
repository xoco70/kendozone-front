import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tournament} from '../../models/tournament';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
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
export class TreesComponent implements OnInit, OnDestroy {
  tournament: Tournament;
  championships: Championship[];
  slug: string;
  navigationSubscription;

  constructor(private navbar: NavService,
              private treeService: TreeService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
    this.slug = this.route.snapshot.params.slug;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getTournamentWithTrees();
      }
    });
  }

  generateTree(championship) {
    this.navbar.setLoading(true);
    this.treeService.store(championship)
      .pipe(first())
      .subscribe(
        tournament => {
          this.navbar.setLoading(false);
          this.router.navigate(['/tournaments', this.tournament.slug, 'trees']);
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

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


}
