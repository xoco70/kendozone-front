import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentEditCategoriesComponent} from './tournament-edit-categories.component';

describe('TournamentEditCategoriesComponent', () => {
  let component: TournamentEditCategoriesComponent;
  let fixture: ComponentFixture<TournamentEditCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentEditCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
