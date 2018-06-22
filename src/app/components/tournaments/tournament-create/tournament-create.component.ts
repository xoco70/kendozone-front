import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../../services/tournament.service';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category';
import {Tournament} from '../../../models/tournament';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {
  private loading = false;
  categories: Category[];
  tournament: Tournament = <Tournament>{};
  usePresets = 1;
  rule = 0;
  presets = [
    {
      id: 1, name: 'Internation Kendo Federation (IKF)',
      categories: [
        {id: 3, name: 'categories.men_single'},
        {id: 4, name: 'categories.men_team'},
        {id: 5, name: 'categories.ladies_single'},
        {id: 6, name: 'categories.ladies_team'}]
    },
    {
      id: 2, name: 'European Kendo Federation (EKF)',
      categories: [
        {id: 1, name: 'categories.junior'},
        {id: 2, name: 'categories.junior_team'},
        {id: 3, name: 'categories.men_single'},
        {id: 4, name: 'categories.men_team'},
        {id: 5, name: 'categories.ladies_single'},
        {id: 6, name: 'categories.ladies_team'}]
    },
    {
      id: 3, name: 'Latin American Kendo Federation (LAKC)',
      categories: [
        {id: 1, name: 'categories.junior'},
        {id: 2, name: 'categories.junior_team'}
      ]
    },
  ];
  private submitted = false;

  constructor(
    private toastr: ToastrService,
    private tournamentService: TournamentService,
    private categoryService: CategoryService,
    private router: Router
  ) {
  }

  onSubmit() {
    this.submitted = true;

    if (this.tournament.rule_id === 0 && this.tournament.categoriesSelected.length === 0) {
      this.toastr.error('You must select at least 1 category'); // TODO translate
      return;
    }

    this.loading = true;
    // this.tournament.
    this.tournamentService.store(this.tournament)
      .subscribe(
        data => {
          this.loading = false;
          console.log(data.slug);
          this.router.navigate(['tournaments', data.slug, 'edit']);
        },
        error => {
          this.loading = false;
        });

  }

  getCategories(): void {
    this.loading = true;
    this.categoryService.all()
      .subscribe(categories => {
        this.categories = categories;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }


  ngOnInit() {
    this.getCategories();
    this.tournament.categoriesSelected = [];
    this.tournament.rule_id = 1;
  }

}
