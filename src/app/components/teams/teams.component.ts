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
import {DragulaOptions, DragulaService} from 'ng2-dragula';
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
  BAG = 'COMPETITORS';
  subs = new Subscription();

  constructor(private navbar: NavService,
              private teamService: TeamService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private dragulaService: DragulaService,
  ) {
    this.slug = this.route.snapshot.params.slug;

    this.subs.add(dragulaService.dropModel(this.BAG)
      .subscribe(({item, source, target}) => {
        const t1 = source.getAttributeNode('id').value;
        const t2 = target.getAttributeNode('id').value;

        const team1: Team = JSON.parse(t1);
        const team2: Team = JSON.parse(t2);


        if (t1 === t2) { // Update competitor's order in team
          // this.updateCompetitorInTeam(item, team2);
          // Do nothing, later we will update the order of fighter in team
          // TODO We need to manage competitor order in team
          return;
        }
        console.log(team1, team2, team1 === team2);

        if (Number(team1) === 0) { // Add competitor to team
          this.addCompetitorToTeam(item, team2);
          return;
        }
        if (Number(team2) === 0) { // Remove competitor to team
          this.removeCompetitorFromTeam(item, team1);
          return;
        }


        this.moveCompetitorFromTeam1toTeam2(item, team1, team2);

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
            const teams = this.data.championships
              .find(x => x.championship === championshipId).teams
              .filter(obj => obj.id !== team.id);
            this.data.championships.find(x => x.championship === championshipId).teams = teams;
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
          console.log('addCompetitorToTeam');
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
          console.log('removeCompetitorFromTeam');
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
          console.log('moveCompetitorFromTeam1toTeam2');
          this.navbar.setLoading(false);
        },
        error => {
          console.log(error);
          this.navbar.setLoading(false);
        });
  }

  // updateCompetitorInTeam(competitor: Competitor, team: Team) {
  //   this.teamService.updateCompetitorInTeam(competitor, team)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.navbar.setLoading(false);
  //       },
  //       error => {
  //         console.log(error);
  //         this.navbar.setLoading(false);
  //       });
  // }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
