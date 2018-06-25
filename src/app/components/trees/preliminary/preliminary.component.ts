import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../models/championship';
import {ChampionshipSettings} from '../../../models/championship-settings';

class FighterGroup {
}

@Component({
  selector: 'app-preliminary',
  templateUrl: './preliminary.component.html',
  styleUrls: ['./preliminary.component.scss']
})
export class PreliminaryComponent implements OnInit {
  @Input() championship: Championship;
  numFighters: number[];
  letter = 'a';
  settings: ChampionshipSettings;
  roundOneGroups: FighterGroup[];

  constructor() {
  }

  ngOnInit() {
    this.settings = this.championship.settings ? this.championship.settings : new ChampionshipSettings() ;
    this.roundOneGroups = this.championship.fighters_groups.filter(h => h.round === 1);
    this.numFighters = Array(this.settings.preliminaryGroupSize).fill(0).map((x, i) => i); // [0,1,2,3,4]
  }

}
