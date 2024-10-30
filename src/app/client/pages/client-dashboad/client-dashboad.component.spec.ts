import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDashboadComponent } from './client-dashboad.component';

describe('ClientDashboadComponent', () => {
  let component: ClientDashboadComponent;
  let fixture: ComponentFixture<ClientDashboadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDashboadComponent]
    });
    fixture = TestBed.createComponent(ClientDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
