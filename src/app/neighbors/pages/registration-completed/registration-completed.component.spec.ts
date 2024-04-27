import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccessfulPage } from './registration-completed.component';

describe('RegistrationCompletedComponent', () => {
  let component: RegistrationSuccessfulPage;
  let fixture: ComponentFixture<RegistrationSuccessfulPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationSuccessfulPage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationSuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
