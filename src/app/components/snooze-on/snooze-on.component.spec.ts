import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnoozeOnComponent } from './snooze-on.component';

describe('SnoozeOnComponent', () => {
  let component: SnoozeOnComponent;
  let fixture: ComponentFixture<SnoozeOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnoozeOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnoozeOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
