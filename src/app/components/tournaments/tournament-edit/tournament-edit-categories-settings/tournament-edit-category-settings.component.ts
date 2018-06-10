import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../../models/championship';

@Component({
  selector: 'app-tournament-edit-category-settings',
  templateUrl: './tournament-edit-category-settings.component.html',
  styleUrls: ['./tournament-edit-category-settings.component.scss']
})
export class TournamentEditCategorySettingsComponent implements OnInit {
  @Input() championships: Championship[];

  constructor() {
  }

  ngOnInit() {
  }

}
