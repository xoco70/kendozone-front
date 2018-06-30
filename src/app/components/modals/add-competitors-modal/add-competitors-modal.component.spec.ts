import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddCompetitorsModalComponent} from './add-competitors-modal.component';

describe('AddCompetitorsModalComponent', () => {
  let component: AddCompetitorsModalComponent;
  let fixture: ComponentFixture<AddCompetitorsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompetitorsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompetitorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
