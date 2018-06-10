import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tournament-edit-categories',
  templateUrl: './tournament-edit-categories.component.html',
  styleUrls: ['./tournament-edit-categories.component.scss']
})
export class TournamentEditCategoriesComponent implements OnInit {
  @Input() categories: any[];

  constructor() {
  }

  ngOnInit() {
  }

}
