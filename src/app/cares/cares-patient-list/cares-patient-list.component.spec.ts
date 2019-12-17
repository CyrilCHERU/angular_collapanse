import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaresPatientListComponent } from './cares-patient-list.component';

describe('CaresDetailsComponent', () => {
  let component: CaresPatientListComponent;
  let fixture: ComponentFixture<CaresPatientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaresPatientListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaresPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
