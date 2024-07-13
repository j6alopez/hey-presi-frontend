import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BuildingUnit } from '@building_units/interfaces/building-unit.interface';
import { BuildingUnitsTableComponent } from '@building_units/components/building-units-table/building-units-table.component';
import { BuildingUnitForm } from '@building_units/interfaces/building-unit-form.interface';
import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';
import { CommunitiesService } from '@communities/communities.service';
import { CommunitiesTableComponent } from '@communities/components/communities-table/communities-table.component';
import { Community } from '@communities/interfaces/community.interface';
import { Pagintation } from '@shared/interfaces/page.interface';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { Sorting } from '@shared/interfaces/sorting.interface';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TabsComponent } from '@shared/components/navigation/tabs/tabs.component';
import { TopBarComponent } from '@shared/components/navigation/top-bar/top-bar.component';
import { FormOperation } from '@shared/enums/form-operation.enum';
import { BuildingUnitsService } from '../../../building-units/building-units.service';
import { CommunitiesFilter } from '@communities/interfaces/communities-filter.interface';
import { BuildingUnitsFilter } from '@building_units/interfaces/building-units-filter.interface';


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
  private readonly communitiesService = inject(CommunitiesService);
  private readonly buildingUnitsService = inject(BuildingUnitsService);

  communities: Community[] = [];
  buildingUnits: BuildingUnit[] = [];

  recordsLoaded = false;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;

  sortCommunityField: keyof Community = 'createdAt';

  communityFilter: CommunitiesFilter = {
    page: 1,
    size: 5,
    sortBy: 'createdAt',
    sortOrder: SortingOrder.ASC,
  }

  sortUnitField: keyof BuildingUnit = 'address';
  buildingUnitsFilter: BuildingUnitsFilter = {
    page: 1,
    size: 5,
    sortBy: 'address',
    sortOrder: SortingOrder.ASC,
  }

  tabs = ['inmuebles', 'propietarios'];
  selectedCommunity?: Community;
  buildingUnitsForm: FormGroup;

  selectedTabIndex: number = 0;

  constructor(private fb: FormBuilder) {
    this.buildingUnitsForm = this.fb.group({
      units: this.fb.array<BuildingUnitForm>([])
    });
  }

  ngOnInit(): void {
    this.loadCommunities();
  }

  private loadCommunities() {
    this.recordsLoaded = false;
    this.communitiesService.getCommunities(this.communityFilter).subscribe(
      (response) => {
        this.communities = response.data;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.metadata.totalCount;
        this.itemsPerPage = this.communityFilter.size
        this.recordsLoaded = true;
      }
    )
  }

  onPageChanged(pageChanged: number) {
    this.communityFilter.page = pageChanged;
    this.loadCommunities();
  }

  onPageSizeChanged(pageSize: number) {
    this.communityFilter.size = pageSize;
    this.loadCommunities();
  }

  onSortingEvent(sorting: Sorting<Community>) {
    const { sortBy, sortOrder } = sorting;
    this.communityFilter.sortBy = sortBy;
    this.communityFilter.sortOrder = sortOrder;

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
      communityId: [this.selectedCommunity!.id, Validators.required],
      address: ['', Validators.required],
      type: [BuildingUnitType.APARTMENT, Validators.required],
      coefficient: [0, [Validators.required, Validators.min(0)]],
      operation: [FormOperation.NEW, Validators.required],
    });
  }

  addBuildingUnit(unit?: any): void {
    this.unitsArray.push(this.createUnit());
  }

  removeBuildingUnit(index: number): void {
    this.unitsArray.removeAt(index);
  }

  onSelectedCommunityChange(community: Community | undefined) {
    this.selectedCommunity = community;
    this.buildingUnitsService.getBuildingUnits(community!.id).subscribe(
      this.buildingUnits = buildingUnits;
  }

  onSubmit() {
    if (this.buildingUnitsForm.invalid) {
      this.buildingUnitsForm.markAllAsTouched();
      return;
    }

    const buildingUnits: BuildingUnit[] = this.buildingUnitsForm.get('units')?.value.map(
      (unit: BuildingUnitForm) => {
        const { communityId, address, type, coefficient } = unit;
        return { communityId, address, type, coefficient, } as BuildingUnit;
      });

    this.buildingUnitsService.bulkUpsertBuildingUnits(buildingUnits).subscribe(
      () => {
        this.buildingUnitsForm.reset();
        this.unitsArray.clear();
      }
    );

  }

}
