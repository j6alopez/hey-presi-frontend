import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityActionComponent } from './community-action-component';

describe('CommunityActionComponentComponent', () => {
  let component: CommunityActionComponent;
  let fixture: ComponentFixture<CommunityActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityActionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommunityActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
