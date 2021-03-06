import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {CompetitorService} from '../../../services/competitor.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavService} from '../../../services/nav.service';

@Component({
  selector: 'app-add-competitors-modal',
  templateUrl: './add-competitors-modal.component.html',
  styleUrls: ['./add-competitors-modal.component.scss']
})
export class AddCompetitorsModalComponent implements OnInit {
  public submitted = false;
  private championshipId: number;
  competitorForm: FormGroup;

  constructor(private navbar: NavService,
              public modal: NgbActiveModal,
              public competitorService: CompetitorService,
              private fb: FormBuilder,
  ) {
  }

  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  ngOnInit() {
    const competitors: FormArray = new FormArray([
      new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.email),
      })
    ]);
    this.competitorForm = this.fb.group({competitors: competitors});
  }

  onSubmit() {
    this.submitted = true;
    // this.loading = true;
    // console.log('championship:' + this.championshipId);
    if (this.competitorForm.invalid) {
      console.log('invalid');
      return;
    }
    this.competitorService.store(this.competitorForm.value, this.championshipId)
      .pipe(first())
      .subscribe(
        data => {
          this.navbar.setLoading(false);
          this.modal.close(data);
        },
        error => {
          this.navbar.setLoading(false);
          this.modal.close('error');
        });
  }

  /**
   * Adds a city FormGroup to the cities <FormArray>FormControl(__cities__)
   * @method addCity
   * @return void
   */
  addCompetitor(): void {
    (<FormArray>this.competitorForm.controls['competitors']).push(
      new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.email),
      })
    );
  }

  removeCompetitor(index: number) {
    const control = <FormArray>this.competitorForm.controls['competitors'];
    control.removeAt(index);
  }


}
