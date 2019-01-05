import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../../models/tournament';
import {LocalStorageService} from '../../../../services/local-storage.service';
import {TournamentService} from '../../../../services/tournament.service';

@Component({
  selector: 'app-tournament-edit-right-menu',
  templateUrl: './tournament-edit-right-menu.component.html',
  styleUrls: ['./tournament-edit-right-menu.component.scss']
})
export class TournamentEditRightMenuComponent implements OnInit {
  @Input() tournament: Tournament;
  @Input() competitors_count: number;
  championships_count: number;
  teams_count: number;
  trees_count: number;
  @Input() slug: string;

  constructor(private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.competitors_count = LocalStorageService.getCompetitorsCount();
    this.championships_count = LocalStorageService.getChampionshipsCount();
    this.teams_count = LocalStorageService.getTeamsCount();
    this.trees_count = LocalStorageService.getTreesCount();
    if (this.competitors_count === null || this.competitors_count === undefined) {
      this.statistics();
    }
    this.statistics();
  }

  statistics(): void {
    this.tournamentService.statistics(this.tournament.slug)
      .subscribe(statistics => {
        // console.log(statistics);
        this.competitors_count = statistics.competitors_count;
        this.championships_count = statistics.championships_count;
        this.teams_count = statistics.teams_count;
        this.trees_count = statistics.trees_count;
      }, err => {
      });
  }

}
