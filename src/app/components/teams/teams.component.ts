import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {Tournament} from '../../models/tournament';
import {NavService} from '../../services/nav.service';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../services/team.service';
import {Championship} from '../../models/championship';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  data: any;
  tournament: Tournament;
  championships: Championship[];
  slug: string;

  constructor(private navbar: NavService,
              private teamService: TeamService,
              private route: ActivatedRoute,
  ) {
    this.slug = this.route.snapshot.params.slug;

  }


  ngOnInit() {
    setTimeout(() => {
      this.getTournamentWithTeams();
    });
  }

  private getTournamentWithTeams() {
    this.navbar.setLoading(true);
    this.teamService.getTournamentWithTeams(this.slug)
      .pipe(first())
      .subscribe(data => {
        this.data = data;
        console.log(data);
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
    return null;
  }
}
