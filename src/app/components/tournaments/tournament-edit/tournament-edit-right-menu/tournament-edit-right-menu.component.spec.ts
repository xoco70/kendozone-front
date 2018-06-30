import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentEditRightMenuComponent} from './tournament-edit-right-menu.component';

describe('TournamentEditRightMenuComponent', () => {
  let component: TournamentEditRightMenuComponent;
  let fixture: ComponentFixture<TournamentEditRightMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentEditRightMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditRightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
