import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingUnitActionComponent } from './building-actions-table';

describe('CommunityActionComponentComponent', () => {
  let component: BuildingUnitActionComponent;
  let fixture: ComponentFixture<BuildingUnitActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingUnitActionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BuildingUnitActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
