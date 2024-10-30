import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAddsComponent } from './all-adds.component';

describe('AllAddsComponent', () => {
  let component: AllAddsComponent;
  let fixture: ComponentFixture<AllAddsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAddsComponent]
    });
    fixture = TestBed.createComponent(AllAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
