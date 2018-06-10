import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../../models/tournament';

@Component({
  selector: 'app-tournament-edit-general',
  templateUrl: './tournament-edit-general.component.html',
  styleUrls: ['./tournament-edit-general.component.scss']
})
export class TournamentEditGeneralComponent implements OnInit {
  @Input() tournament: Tournament;

  constructor() {

  }

  ngOnInit() {
    console.log('rrr');
    // console.log(this.data);
    console.log(this.tournament);
  }

}
