import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../../models/tournament';

@Component({
  selector: 'app-tournament-edit-right-menu',
  templateUrl: './tournament-edit-right-menu.component.html',
  styleUrls: ['./tournament-edit-right-menu.component.scss']
})
export class TournamentEditRightMenuComponent implements OnInit {
@Input() tournament: Tournament;
@Input() competitors_count: number;
@Input() championships_count: number;
@Input() championship_settings_count: number;
@Input() teams_count: number;
@Input() trees_count: number;
@Input() slug: string;
  constructor() { }

  ngOnInit() {
  }

}
