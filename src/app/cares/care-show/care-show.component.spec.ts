import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareShowComponent } from './care-show.component';

describe('CareShowComponent', () => {
  let component: CareShowComponent;
  let fixture: ComponentFixture<CareShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
