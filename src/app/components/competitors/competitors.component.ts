import {Component, OnInit} from '@angular/core';
import {CompetitorService} from '../../services/competitor.service';
import {ActivatedRoute} from '@angular/router';
import {Competitor} from '../../models/competitor';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.scss']
})
export class CompetitorsComponent implements OnInit {
  competitors: Competitor[];
  page = 1;
  public loading = true;
  tournamentSlug: string;

  constructor(private competitorService: CompetitorService,
              private route: ActivatedRoute
  ) {
    this.tournamentSlug = this.route.snapshot.params.slug;

  }

  all(page?: number): void {
    this.loading = true;
    this.competitorService.all(page)
      .subscribe(competitors => {
        this.competitors = competitors;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  delete(competitor: Competitor): void {
    this.loading = true;
    this.competitors['data'] = this.competitors['data'].filter(h => h !== competitor);
    this.competitorService.delete(this.tournamentSlug, competitor).subscribe();
    this.loading = false;
  }


  ngOnInit() {

    this.all();

  }

  pageChanged(page: number) {
    this.page = page;
    this.all(page);
  }
}
