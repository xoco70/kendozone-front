import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../../models/championship';
import {ChampionshipSettings} from '../../../../models/championship-settings';
import {ChampionshipSettingsService} from '../../../../services/championship-settings.service';
import {NavService} from '../../../../services/nav.service';

@Component({
  selector: 'app-tournament-edit-category-settings',
  templateUrl: './tournament-edit-category-settings.component.html',
  styleUrls: ['./tournament-edit-category-settings.component.scss']
})
export class TournamentEditCategorySettingsComponent implements OnInit, AfterViewChecked {
  @Input() championship: Championship;
  @Input() i: number;
  durations: string[];
  submitted: boolean;

  constructor(private navbar: NavService,
              private cdRef: ChangeDetectorRef,
              private settingsService: ChampionshipSettingsService) {
  }

  onSubmit() {
    this.submitted = true;

    this.navbar.setLoading(true);

    if (this.championship.settings.id == null) {
      this.settingsService.store(this.championship.id, this.championship.settings)
        .subscribe(
          settings => {
            // console.log(settings.settings.id);
            this.championship.settings.id = settings.id;
            this.navbar.setLoading(false);
          },
          error => {
            this.navbar.setLoading(false);
          });
    } else {
      this.settingsService.update(this.championship.id, this.championship.settings)
        .subscribe(data => {
            this.navbar.setLoading(false);
          },
          error => {
            this.navbar.setLoading(false);
          });
    }
  }

  ngOnInit() {
    const settingsDefault = new ChampionshipSettings();
    if (this.championship.settings == null) {
      this.championship.settings = settingsDefault;
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

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
