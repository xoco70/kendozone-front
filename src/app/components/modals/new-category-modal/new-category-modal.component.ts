import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {first} from 'rxjs/operators';
import {Category} from '../../../models/category';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-category-modal',
  templateUrl: './new-category-modal.component.html',
  styleUrls: ['./new-category-modal.component.scss']
})
export class NewCategoryModalComponent implements OnInit {
  loading = false;
  submitted = false;
  category: Category = <Category> {};
  error = '';
  const;
  // translations
  private years: string;
  private grade: string;
  private age: string;
  public single: string;
  public team: string;

  genders = [
    {id: 'M', text: ''},
    {id: 'F', text: ''},
    {id: 'X', text: ''}
  ];

  ageCategories = [
    {id: 0, text: 'categories.no_age_restriction'},
    {id: 1, text: 'Childs'},
    {id: 2, text: 'Students'},
    {id: 3, text: 'Adults'},
    {id: 4, text: 'Master'},
    {id: 5, text: 'categories.custom'}
  ];
  ages = Array(85).fill(0).map((x, i) => i);
  grades = [
    {id: 0, text: 'categories.no_grade_restriction'},
    {id: 2, text: '7 Kyu'},
    {id: 3, text: '6 Kyu'},
    {id: 4, text: '5 Kyu'},
    {id: 5, text: '4 Kyu'},
    {id: 6, text: '3 Kyu'},
    {id: 7, text: '2 Kyu'},
    {id: 8, text: '1 Kyu'},
    {id: 9, text: '1 Dan'},
    {id: 10, text: '2 Dan'},
    {id: 11, text: '3 Dan'},
    {id: 12, text: '4 Dan'},
    {id: 13, text: '5 Dan'},
    {id: 14, text: '6 Dan'},
    {id: 15, text: '7 Dan'},
    {id: 16, text: '8 Dan'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private translateService: TranslateService,
    public modal: NgbActiveModal
  ) {
  }

  onSubmit() {
    this.submitted = true;
    this.modal.close('Submit');
    this.loading = true;

    this.categoryService.store(this.category)
      .pipe(first())
      .subscribe(
        data => {
          // TODO Parent screen updated
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  setCategoryTitle() {
    const isTeam = this.category.isTeam === 1 ? this.team : this.single;
    this.category.name = isTeam + ' ' +
      this.getSelectText(this.genders, this.category.gender) + ' ' +
      this.getAgeText() + ' ' +
      this.getGradeText();
  }

  ngOnInit() {
    this.translateService.get('categories.years').subscribe(value => {
      this.years = value;
    });
    this.translateService.get('core.grade').subscribe(value => {
      this.grade = value;
    });
    this.translateService.get('categories.age').subscribe(value => {
      this.age = value;
    });
    this.translateService.get('categories.single').subscribe(value => {
      this.single = value;
    });
    this.translateService.get('core.team').subscribe(value => {
      this.team = value;
    });
    this.translateService.get('categories.male').subscribe(value => {
      this.genders[0].text = value;
    });
    this.translateService.get('categories.female').subscribe(value => {
      this.genders[1].text = value;
    });
    this.translateService.get('categories.mixt').subscribe(value => {
      this.genders[2].text = value;
    });
    this.translateService.get('categories.children').subscribe(value => {
      this.ageCategories[1].text = value;
    });
    this.translateService.get('categories.students').subscribe(value => {
      this.ageCategories[2].text = value;
    });
    this.translateService.get('categories.adults').subscribe(value => {
      this.ageCategories[3].text = value;
    });
    this.translateService.get('categories.masters').subscribe(value => {
      this.ageCategories[4].text = value;
    });


    this.category = new Category();
    this.category.name = 'Single Male';
    this.category.gender = 'M';
    this.category.isTeam = 0;
    this.category.ageCategory = 0;
    this.category.ageMin = 0;
    this.category.ageMax = 0;
    this.category.gradeCategory = 0;
    this.category.gradeMin = 0;
    this.category.gradeMax = 0;
  }

  private getSelectText(myArray: { id: any; text: string }[], val: any) {
    let newVal = '';
    myArray.map(function (el) {
      if (val === el.id) {
        newVal = el.text;
      }
    });
    return newVal;
  }

  private getAgeText() {
    let ageCategoryText = '';
    if (this.category.ageCategory === 0) {
      return '';
    }
    if (this.category.ageCategory !== 5) {
      return this.getSelectText(this.ageCategories, this.category.ageCategory);
    }
    ageCategoryText = ' - ' + this.age + ' : ';

    if (this.category.ageMin === 0 && this.category.ageMax === 0) {
      return '';
    }
    if (this.category.ageMin === 0 && this.category.ageMax !== 0) {
      ageCategoryText += ' < ' + this.category.ageMax + ' ' + this.years;
    }
    if (this.category.ageMin !== 0 && this.category.ageMax === 0) {
      ageCategoryText += ' > ' + this.category.ageMin + ' ' + this.years;
    }
    if (this.category.ageMin !== 0 && this.category.ageMax !== 0) {
      if (this.category.ageMin === this.category.ageMax) {
        ageCategoryText += this.category.ageMax + ' ' + this.years;
      } else {
        ageCategoryText += this.category.ageMin + ' - ' + this.category.ageMax + ' ' + this.years;
      }
    }
    return ageCategoryText;
  }

  private getGradeText() {
    let gradeText = '';
    if (this.category.gradeCategory !== 3) {
      return '';
    }
    gradeText = ' - ' + this.grade + ' : ';
    if (this.category.gradeMin !== 0 && this.category.gradeMax !== 0) {
      if (this.category.gradeMin === this.category.gradeMax) {
        gradeText += this.getSelectText(this.grades, this.category.gradeMin);
      } else {
        gradeText += this.getSelectText(this.grades, this.category.gradeMin) + ' - '
          + this.getSelectText(this.grades, this.category.gradeMax);
      }

    } else if (this.category.gradeMin === 0 && this.category.gradeMax !== 0) {
      gradeText += ' < ' + this.getSelectText(this.grades, this.category.gradeMax);
    } else if (this.category.gradeMin !== 0 && this.category.gradeMax === 0) {
      gradeText += ' > ' + this.getSelectText(this.grades, this.category.gradeMin);
    }

    return gradeText;
  }
}
