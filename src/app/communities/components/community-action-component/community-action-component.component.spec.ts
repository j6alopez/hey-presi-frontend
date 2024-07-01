import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityActionComponentComponent } from './community-action-component.component';

describe('CommunityActionComponentComponent', () => {
  let component: CommunityActionComponentComponent;
  let fixture: ComponentFixture<CommunityActionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityActionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunityActionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
