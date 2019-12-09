import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareFormComponent } from './care-form.component';

describe('CareFormComponent', () => {
  let component: CareFormComponent;
  let fixture: ComponentFixture<CareFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
