import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TournamentService} from '../../../../services/tournament.service';
import {Tournament} from '../../../../models/tournament';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewCategoryModalComponent} from '../../../modals/new-category-modal/new-category-modal.component';

@Component({
  selector: 'app-tournament-edit-categories',
  templateUrl: './tournament-edit-categories.component.html',
  styleUrls: ['./tournament-edit-categories.component.scss']
})
export class TournamentEditCategoriesComponent implements OnInit {
  @Input() tournament: Tournament;
  @Input() categories;
  @Input() componentName;
  @Input() disabled: boolean;

  loading: boolean;
  categoriesSelected = [];
  submitted: boolean;
  category;
  hasPreliminary: boolean;

  constructor(private toastr: ToastrService,
              private tournamentService: TournamentService,
              private modalService: NgbModal) {
  }

  open() {
    const modalRef = this.modalService.open(NewCategoryModalComponent, {size: 'lg', centered: true});
    modalRef.result.then((category) => {
      const newCategory = {
        id: category.id,
        name: category.name
      };


      // if not present into categories, insert it
      if (!this.categories.some((item) => item.id == newCategory.id)) {
        this.categories.push(newCategory);
      } else {
        this.toastr.error('Category has already been added');
      }
    }, (reason) => {
      console.log('dismissed');
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.tournament.categoriesSelected.length === 0) {
      this.toastr.error('You must select at least 1 category'); // TODO translate
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
    if (this.tournament.id) {
      this.tournament.categoriesSelected = this.tournament.championships.map(championship => championship.category.id);
    }
  }
}
