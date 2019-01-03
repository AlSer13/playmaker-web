import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamWizardComponent } from './add-team-wizard.component';

describe('AddTeamWizardComponent', () => {
  let component: AddTeamWizardComponent;
  let fixture: ComponentFixture<AddTeamWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeamWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
