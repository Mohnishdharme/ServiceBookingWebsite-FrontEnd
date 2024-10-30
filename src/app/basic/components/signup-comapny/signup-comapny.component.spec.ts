import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComapnyComponent } from './signup-comapny.component';

describe('SignupComapnyComponent', () => {
  let component: SignupComapnyComponent;
  let fixture: ComponentFixture<SignupComapnyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComapnyComponent]
    });
    fixture = TestBed.createComponent(SignupComapnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
