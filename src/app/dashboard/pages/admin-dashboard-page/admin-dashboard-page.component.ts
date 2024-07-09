import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuildingUnitsTableComponent } from 'building-units/components/building-units-table/building-units-table.component';
import { CommunitiesService } from '@communities/communities.service';
import { CommunitiesTableComponent } from '@communities/components/communities-table/communities-table.component';
import { Community } from '@communities/interfaces/community.interface';
import { Page } from '@shared/interfaces/page.interface';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { Sorting } from '@shared/interfaces/sorting.interface';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TabsComponent } from '@shared/components/navigation/tabs/tabs.component';
import { TopBarComponent } from '@shared/components/navigation/top-bar/top-bar.component';
import { BuildingUnit } from 'building-units/interfaces/building-unit.interface';
import { BuildingUnitType } from 'building-units/enums/building-unit-type.enum';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    BuildingUnitsTableComponent,
    CommunitiesTableComponent,
    PaginatorComponent,
    ReactiveFormsModule,
    RouterModule,
    SpinnerComponent,
    TabsComponent,
    TopBarComponent,
  ],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashBoardPageComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  private readonly communitiesService = inject(CommunitiesService);

  communities: Community[] = [];
  buildingUnits: BuildingUnit[] = [];

  recordsLoaded = false;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;

  initialField: keyof Community = 'createdAt';

  pagination: Page = {
    page: 1,
    size: 5,
  }

  sorting: Sorting = {
    sortBy: this.initialField,
    sortOrder: SortingOrder.ASC,
  }

  tabs = ['inmuebles', 'propietarios'];
  selectedTabIndex = 0;

  buildingUnitsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildingUnitsForm = this.fb.group({
      units: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadCommunities();
  }

  private loadCommunities() {
    this.recordsLoaded = false;
    this.communitiesService.getCommunities(this.pagination, this.sorting).subscribe(
      (response) => {
        this.communities = response.data;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.metadata.totalCount;
        this.itemsPerPage = this.pagination.size
        this.recordsLoaded = true;
      }
    )
  }

  onPageChanged(pageChanged: number) {
    this.pagination.page = pageChanged;
    this.loadCommunities();
  }
  onPageSizeChanged(pageSize: number) {
    this.pagination.size = pageSize;
    this.loadCommunities();
  }

  onSortingEvent(sorting: Sorting) {
    this.sorting = sorting;
    this.loadCommunities();
  }

  onTabChanged(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  get unitsArray(): FormArray {
    return this.buildingUnitsForm.get('units') as FormArray;
  }

  createUnit(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      communityId: ['', Validators.required],
      type: [BuildingUnitType.APARTMENT, Validators.required],
      coefficient: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addBuildingUnit(unit?: any): void {
    this.unitsArray.push(this.createUnit());
  }

  removeBuildingUnit(index: number): void {
    this.unitsArray.removeAt(index);
  }

}
