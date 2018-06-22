import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../models/championship';

@Component({
  selector: 'app-single-elimination',
  templateUrl: './single-elimination.component.html',
  styleUrls: ['./single-elimination.component.scss']
})
export class SingleEliminationComponent implements OnInit {
  @Input() championship: Championship;
  constructor() { }

  ngOnInit() {
  }

}
