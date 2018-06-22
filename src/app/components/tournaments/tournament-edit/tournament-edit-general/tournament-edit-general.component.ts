import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../../models/tournament';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {TournamentService} from '../../../../services/tournament.service';

@Component({
  selector: 'app-tournament-edit-general',
  templateUrl: './tournament-edit-general.component.html',
  styleUrls: ['./tournament-edit-general.component.scss']
})
export class TournamentEditGeneralComponent implements OnInit {
  @Input() tournament: Tournament;
  public localTournament: Tournament = <Tournament>{};
  public dateIni: { year: 2017, month: 8, day: 8 }; // TODO should not have a default value
  @Input() registerDateLimit: { year: 2017, month: 8, day: 8 }; // TODO should not have a default value
  generalForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private tournamentService: TournamentService
  ) {

  }

  get f() {
    return this.generalForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.generalForm.invalid) {
      return;
    }

    this.loading = true;
    // I use localTournament not to send the whole object
    // I still don't know if I have a Eloquent like in Angular

    this.localTournament.name = this.f.name.value;
    this.localTournament.slug = this.tournament.slug;
    this.localTournament.dateIni = this.f.dateIni.value;
    this.localTournament.dateFin = this.f.dateFin.value;
    this.localTournament.registerDateLimit = this.f.registerDateLimit.value;
    this.localTournament.promoter = this.f.promoter.value;
    this.localTournament.host_organization = this.f.host_organization.value;
    this.localTournament.technical_assistance = this.f.technical_assistance.value;

    this.tournamentService.update(this.localTournament, 'general')
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  ngOnInit() {

    this.generalForm = this.formBuilder.group({
      name: [this.tournament.name, Validators.required],
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
      promoter: [this.tournament.promoter, null],
      host_organization: [this.tournament.host_organization, null],
      technical_assistance: [this.tournament.technical_assistance, null],
    });
  }

}
