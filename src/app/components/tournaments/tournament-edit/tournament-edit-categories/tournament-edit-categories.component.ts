import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {TournamentService} from '../../../../services/tournament.service';
import {Tournament} from '../../../../models/tournament';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewCategoryModalComponent} from '../../../modals/new-category-modal/new-category-modal.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-tournament-edit-categories',
  templateUrl: './tournament-edit-categories.component.html',
  styleUrls: ['./tournament-edit-categories.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TournamentEditCategoriesComponent),
      multi: true
    }]
})
export class TournamentEditCategoriesComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() tournament: Tournament;
  @Input() categories;
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

  ngAfterViewInit() {
    if (this.tournament.id) {
      this.tournament.categoriesSelected = this.tournament.championships.map(championship => championship.category.id);
    }
  }

  // the method set in registerOnChange, it is just
  // a placeholder for a method that takes one parameter,
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => {
  };

  // this is the initial value set to the component
  public writeValue(obj: any) {
  }

  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // not used, used for touch input
  public registerOnTouched() {
  }

  // change events from the textarea
  private onChange(event) {
    // update the form
    this.propagateChange(this.tournament.categoriesSelected);
  }
}
