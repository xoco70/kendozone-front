import {Component, OnDestroy, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {Tournament} from '../../models/tournament';
import {NavService} from '../../services/nav.service';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../services/team.service';
import {Championship} from '../../models/championship';
import {ToastrService} from 'ngx-toastr';
import {Team} from '../../models/team';
import * as vm from 'vm';
import {Subscription} from 'rxjs';
import {DragulaService} from 'ng2-dragula';
import {Competitor} from '../../models/competitor';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {
  data: any;
  name: string;
  tournament: Tournament;
  championships: Championship[];
  slug: string;
  BAG = 'DRAGULA_EVENTS';
  subs = new Subscription();

  constructor(private navbar: NavService,
              private teamService: TeamService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private dragulaService: DragulaService,
  ) {
    this.slug = this.route.snapshot.params.slug;
    this.subs.add(dragulaService.drop(this.BAG)
      .subscribe(({el}) => {
        console.log(el);
      })
    );
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

  delete(team: Team, championshipId: number) {
    this.teamService.delete(team)
      .subscribe(
        data => {
          if (data !== '') { // Query worked
            this.data.championships.find(x => x.championship === championshipId).teams.pop(team);
          }
          this.navbar.setLoading(false);
        },
        error => {
          console.log(error);
          this.navbar.setLoading(false);
        });
  }

  addCompetitorToTeam(competitor: Competitor, team: Team) {
    this.teamService.addCompetitorToTeam(competitor, team)
      .subscribe(
        data => {
          console.log(data);
          this.navbar.setLoading(false);
        },
        error => {
          console.log(error);
          this.navbar.setLoading(false);
        });
  }

  removeCompetitorFromTeam(competitor: Competitor, team: Team) {
    this.teamService.removeCompetitorFromTeam(competitor, team)
      .subscribe(
        data => {
          console.log(data);
          this.navbar.setLoading(false);
        },
        error => {
          console.log(error);
          this.navbar.setLoading(false);
        });
  }

  moveCompetitorFromTeam1toTeam2(competitor: Competitor, team1: Team, team2: Team) {
    this.teamService.moveCompetitorFromTeam1toTeam2(competitor, team1, team2)
      .subscribe(
        data => {
          console.log(data);
          this.navbar.setLoading(false);
        },
        error => {
          console.log(error);
          this.navbar.setLoading(false);
        });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
