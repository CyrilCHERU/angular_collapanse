import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterDetailComponent } from './inter-detail.component';

describe('InterDetailComponent', () => {
  let component: InterDetailComponent;
  let fixture: ComponentFixture<InterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
