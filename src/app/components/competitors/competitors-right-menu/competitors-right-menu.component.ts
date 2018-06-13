import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-competitors-right-menu',
  templateUrl: './competitors-right-menu.component.html',
  styleUrls: ['./competitors-right-menu.component.scss']
})
export class CompetitorsRightMenuComponent implements OnInit {
  @Input() championships;

  constructor() {
  }

  ngOnInit() {
  }

}
