import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../../models/tournament';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tournament-edit-general',
  templateUrl: './tournament-edit-general.component.html',
  styleUrls: ['./tournament-edit-general.component.scss']
})
export class TournamentEditGeneralComponent implements OnInit {
  @Input() tournament: Tournament;
  public dateIni: { year: 2017, month: 8, day: 8 };
  @Input() registerDateLimit: { year: 2017, month: 8, day: 8 };
  generalForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // private authenticationService: AuthenticationService
  ) {

  }

  getYear(date: string): string {
    return null;
  }

  get f() {
    return this.generalForm.controls;
  }

  onSubmit() {
    console.log(this.f.dateIni.value);
  }

  ngOnInit() {

    this.generalForm = this.formBuilder.group({
      name: [this.tournament.dateFin.slice(0, 10), Validators.required],
      dateIni: [{
        'year': parseInt(this.tournament.dateIni.slice(0, 4), 10),
        'month': parseInt(this.tournament.dateIni.slice(5, 7), 10),
        'day': parseInt(this.tournament.dateIni.slice(8, 10), 10)
      }, Validators.required],
      dateFin: [{
        'year': parseInt(this.tournament.dateFin.slice(0, 4), 10),
        'month': parseInt(this.tournament.dateFin.slice(5, 7), 10),
        'day': parseInt(this.tournament.dateFin.slice(8, 10), 10)
      }, Validators.required],
      registerDateLimit: [{
        'year': parseInt(this.tournament.registerDateLimit.slice(0, 4), 10),
        'month': parseInt(this.tournament.registerDateLimit.slice(5, 7), 10),
        'day': parseInt(this.tournament.registerDateLimit.slice(8, 10), 10)
      }, Validators.required],
    });
  }

}
