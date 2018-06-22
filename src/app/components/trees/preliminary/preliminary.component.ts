import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../models/championship';

class FighterGroup {
}

@Component({
  selector: 'app-preliminary',
  templateUrl: './preliminary.component.html',
  styleUrls: ['./preliminary.component.scss']
})
export class PreliminaryComponent implements OnInit {
  @Input() championship: Championship;
  roundOneGroups: FighterGroup[];

  constructor() {
  }

  ngOnInit() {
    this.roundOneGroups = this.championship.fighters_groups.filter(h => h.round === 1);
  }

}
