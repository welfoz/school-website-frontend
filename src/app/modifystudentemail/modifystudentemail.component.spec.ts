import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifystudentemailComponent } from './modifystudentemail.component';

describe('ModifystudentemailComponent', () => {
  let component: ModifystudentemailComponent;
  let fixture: ComponentFixture<ModifystudentemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifystudentemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifystudentemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
