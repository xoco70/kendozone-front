import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../../models/championship';
import {ChampionshipSettings} from '../../../../models/championship-settings';
import {ChampionshipSettingsService} from '../../../../services/championship-settings.service';

@Component({
  selector: 'app-tournament-edit-category-settings',
  templateUrl: './tournament-edit-category-settings.component.html',
  styleUrls: ['./tournament-edit-category-settings.component.scss']
})
export class TournamentEditCategorySettingsComponent implements OnInit {
  @Input() championship: Championship;
  @Input() i: number;
  durations: string[];
  submitted: boolean;
  loading: boolean;

  constructor(private settingsService: ChampionshipSettingsService) {
  }

  onSubmit() {
    this.submitted = true;

    this.loading = true;

    if (this.championship.settings.id == null) {
      this.settingsService.store(this.championship.id, this.championship.settings)
        .subscribe(
          data => {
            // console.log(data.settings.id);
            this.championship.settings.id = data['settings'].id;
            this.loading = false;
          },
          error => {
            this.loading = false;
          });
    } else {
      this.settingsService.update(this.championship.id, this.championship.settings)
        .subscribe(data => {
            this.loading = false;
          },
          error => {
            this.loading = false;
          });
    }
  }

  ngOnInit() {
    const settingsDefault = new ChampionshipSettings();
    settingsDefault.fightingAreas = 1;
    settingsDefault.fightDuration = '05:00';
    settingsDefault.hasPreliminary = true;
    settingsDefault.preliminaryGroupSize = 3;
    // settingsDefault.preliminaryDuration = '05:00';
    // settingsDefault.preliminaryWinner = 1;
    // settingsDefault.hasEncho = true;
    // settingsDefault.enchoQty = 1;
    // settingsDefault.enchoDuration = '02:00';
    // settingsDefault.hasHantei = false;
    // settingsDefault.hanteiLimit = 1;
    // settingsDefault.enchoGoldPoint = 1;
    // settingsDefault.limitByEntity = 1;
    // settingsDefault.cost = 1;
    settingsDefault.treeType = 0;
    // settingsDefault.seedQuantity = 1;

    if (this.championship.settings == null) {
      this.championship.settings = settingsDefault;
      console.log(this.championship.settings);
    }
    this.durations = [
      '01:15',
      '01:30',
      '01:45',
      '02:00',
      '02:15',
      '02:30',
      '02:45',
      '03:00',
      '03:15',
      '03:30',
      '03:45',
      '04:00',
      '04:15',
      '04:30',
      '04:45',
      '05:00',
    ];

  }

}
