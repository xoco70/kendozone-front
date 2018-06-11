import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../../models/championship';
import {Category} from '../../../../models/category';

@Component({
  selector: 'app-tournament-edit-categories',
  templateUrl: './tournament-edit-categories.component.html',
  styleUrls: ['./tournament-edit-categories.component.scss']
})
export class TournamentEditCategoriesComponent implements OnInit {
  @Input() categories: Category[];
  @Input() championships: Championship[];

  constructor() {
  }

  ngOnInit() {
  }

}
