import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentEditCategorySettingsComponent} from './tournament-edit-category-settings.component';

describe('TournamentEditCategorySettingsComponent', () => {
  let component: TournamentEditCategorySettingsComponent;
  let fixture: ComponentFixture<TournamentEditCategorySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentEditCategorySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditCategorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
