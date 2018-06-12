import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../../models/championship';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tournament-edit-category-settings',
  templateUrl: './tournament-edit-category-settings.component.html',
  styleUrls: ['./tournament-edit-category-settings.component.scss']
})
export class TournamentEditCategorySettingsComponent implements OnInit {
  @Input() championships: Championship[];
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({});
  }

}
