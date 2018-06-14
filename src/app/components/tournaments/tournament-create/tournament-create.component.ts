import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../../services/tournament.service';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category';
import {Tournament} from '../../../models/tournament';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {
  private loading = false;
  private presets: any;
  selectedEntry;
  mode: boolean;
  categories: Category[];
  tournament: Tournament = <Tournament>{};

  constructor(
    private tournamentService: TournamentService,
    private categoryService: CategoryService,
  ) {
  }

  tournamentPresets(): void {
    this.loading = true;
    this.tournamentService.tournamentPresets()
      .subscribe(presets => {
        this.presets = presets;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  getCategories(): void {
    this.loading = true;
    this.categoryService.all()
      .subscribe(categories => {
        this.categories = categories;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  // displayPresetsLabels(presetId: number): string {
  //   let labels = this.presets[presetId];
  //   console.log(labels);
  //   return labels;
  // }

  // onSelectionChange(entry) {
  //   this.selectedEntry = entry;
  // }

  ngOnInit() {
    this.tournamentPresets();
    this.getCategories();
  }

}
