import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../models/championship';

@Component({
  selector: 'app-playoff',
  templateUrl: './playoff.component.html',
  styleUrls: ['./playoff.component.scss']
})
export class PlayoffComponent implements OnInit {
  @Input() championship: Championship;
  constructor() { }

  ngOnInit() {
  }

}
