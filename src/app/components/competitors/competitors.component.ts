import {Component, OnInit} from '@angular/core';
import {CompetitorService} from '../../services/competitor.service';
import {ActivatedRoute} from '@angular/router';
import {Tournament} from '../../models/tournament';
import {Competitor} from '../../models/competitor';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.scss']
})
export class CompetitorsComponent implements OnInit {
  tournament: Tournament;
  page = 1;
  public loading = true;
  tournamentSlug: string;

  constructor(private competitorService: CompetitorService,
              private route: ActivatedRoute
  ) {
    this.tournamentSlug = this.route.snapshot.params.slug;

  }

  all(): void {
    this.loading = true;
    this.competitorService.all(this.tournamentSlug)
      .pipe(first())
      .subscribe(tournament => {
        this.tournament = tournament;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  delete(competitor: Competitor, championshipIndex: number): void {
    this.loading = true;
    // tournament.championships[x].user
    // this.tournament.competitors = this.tournament.competitors.filter(h => h !== competitor);
    this.tournament.championships[championshipIndex].competitors = this.tournament.championships[championshipIndex].competitors.filter(h => h !== competitor);
    this.competitorService.delete(this.tournamentSlug, competitor).subscribe();
    this.loading = false;
  }


  ngOnInit() {

    this.all();

  }

  pageChanged(page: number) {
    this.page = page;
    this.all();
  }
}
