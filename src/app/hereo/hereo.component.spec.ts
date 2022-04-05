import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HereoComponent } from './hereo.component';

describe('HereoComponent', () => {
  let component: HereoComponent;
  let fixture: ComponentFixture<HereoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HereoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HereoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
