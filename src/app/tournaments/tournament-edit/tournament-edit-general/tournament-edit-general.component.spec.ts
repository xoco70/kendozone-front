import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentEditGeneralComponent } from './tournament-edit-general.component';

describe('TournamentEditGeneralComponent', () => {
  let component: TournamentEditGeneralComponent;
  let fixture: ComponentFixture<TournamentEditGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentEditGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
