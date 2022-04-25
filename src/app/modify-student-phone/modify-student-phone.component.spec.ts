import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStudentPhoneComponent } from './modify-student-phone.component';

describe('ModifyStudentPhoneComponent', () => {
  let component: ModifyStudentPhoneComponent;
  let fixture: ComponentFixture<ModifyStudentPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyStudentPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyStudentPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
