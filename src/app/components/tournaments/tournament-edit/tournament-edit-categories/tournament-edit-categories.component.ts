import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TournamentService} from '../../../../services/tournament.service';
import {Tournament} from '../../../../models/tournament';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../../../models/category';

@Component({
  selector: 'app-tournament-edit-categories',
  templateUrl: './tournament-edit-categories.component.html',
  styleUrls: ['./tournament-edit-categories.component.scss']
})
export class TournamentEditCategoriesComponent implements OnInit {
  @Input() tournament: Tournament;
  @Input() categories: Category[];

  loading: boolean;
  categoriesSelected = [];
  submitted: boolean;
  hasPreliminary: boolean;

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private tournamentService: TournamentService) {
  }

  onSubmit() {
    this.submitted = true;

    if (this.tournament.categoriesSelected.length === 0) {
      this.toastr.error('You must select at least 1 category');
      return;
    }

    this.loading = true;

    // this.tournament.
    this.tournamentService.update(this.tournament, 'categories')
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  changeCategory(e) {
    if (e.target.checked) {
      this.tournament.categoriesSelected.push(parseInt(e.target.id, 10));
    } else {
      this.tournament.categoriesSelected = this.tournament.categoriesSelected.filter(item => item !== parseInt(e.target.id, 10));
    }
  }

  ngOnInit() {
    this.tournament.categoriesSelected = this.tournament.championships.map(championship => championship.category.id);
  }
}
