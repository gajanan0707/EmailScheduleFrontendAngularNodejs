import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShecduleComponent } from './shecdule.component';

describe('ShecduleComponent', () => {
  let component: ShecduleComponent;
  let fixture: ComponentFixture<ShecduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShecduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShecduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
