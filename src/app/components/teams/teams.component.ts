import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {Tournament} from '../../models/tournament';
import {NavService} from '../../services/nav.service';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../services/team.service';
import {Championship} from '../../models/championship';
import {ToastrService} from 'ngx-toastr';
import {Team} from '../../models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  data: any;
  name: string;
  tournament: Tournament;
  championships: Championship[];
  slug: string;

  constructor(private navbar: NavService,
              private teamService: TeamService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
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
        // console.log(data);
        this.navbar.setLoading(false);
      }, err => {
        this.navbar.setLoading(false);
      });
    return null;
  }

  onSubmit(championship) {
    let addedTeam: Team;

    if (this.name === undefined || this.name.length === 0) {
      this.toastr.error('Team cannot have empty name'); // TODO translate
      return;
    }

    this.navbar.setLoading(true);

    this.teamService.store(championship.id, new Team(this.name))
      .subscribe(
        data => {
          addedTeam = data;
          if (data !== '') { // Query worked
            this.data.championships.find(x => x.championship === championship.id).teams.push(addedTeam);
          }
          this.navbar.setLoading(false);
        },
        error => {
          console.log(error);
          this.navbar.setLoading(false);
        });

  }
}
