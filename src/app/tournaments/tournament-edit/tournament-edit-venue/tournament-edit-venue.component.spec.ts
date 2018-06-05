import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentEditVenueComponent } from './tournament-edit-venue.component';

describe('TournamentEditVenueComponent', () => {
  let component: TournamentEditVenueComponent;
  let fixture: ComponentFixture<TournamentEditVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentEditVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
