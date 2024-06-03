import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesTableComponent } from './communities-table.component';

describe('CommunitiesTableComponent', () => {
  let component: CommunitiesTableComponent;
  let fixture: ComponentFixture<CommunitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunitiesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
