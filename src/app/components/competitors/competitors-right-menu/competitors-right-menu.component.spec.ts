import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitorsRightMenuComponent} from './competitors-right-menu.component';

describe('CompetitorsRightMenuComponent', () => {
  let component: CompetitorsRightMenuComponent;
  let fixture: ComponentFixture<CompetitorsRightMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorsRightMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorsRightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
