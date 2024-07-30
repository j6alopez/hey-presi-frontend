import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BuildingUnit } from '@building_units/interfaces/building-unit.interface';
import { BuildingUnitForm } from '@building_units/interfaces/building-unit-form.interface';
import { BuildingUnitsTabComponent } from '@communities/components/building-units-tab/building-units-tab.component';
import { BuildingUnitsTableComponent } from '@building_units/components/building-units-table/building-units-table.component';
import { CommunitiesFilter, SortingComunityColumns } from '@communities/interfaces/communities-filter.interface';
import { CommunitiesService } from '@communities/communities.service';
import { CommunitiesTableComponent } from '@communities/components/communities-table/communities-table.component';
import { Community } from '@communities/interfaces/community.interface';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { Sorting } from '@shared/interfaces/sorting.interface';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TabsComponent } from '@shared/components/navigation/tabs/tabs.component';
import { TopBarComponent } from '@shared/components/navigation/top-bar/top-bar.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BuildingUnitsTabComponent,
    BuildingUnitsTableComponent,
    CommunitiesTableComponent,
    PaginatorComponent,
    ReactiveFormsModule,
    RouterModule,
    SearchBoxComponent,
    SpinnerComponent,
    TabsComponent,
    TopBarComponent,
  ],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashBoardPageComponent implements OnInit {
  private readonly communitiesService = inject(CommunitiesService);

  communities: Community[] = [];
  buildingUnits: BuildingUnit[] = [];

  recordsLoaded = false;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;

  communityFilter: CommunitiesFilter = {
    page: 1,
    size: 5,
    sortBy: 'createdAt',
    sortOrder: SortingOrder.ASC,
    search: ''
  }


  tabs = ['inmuebles', 'propietarios'];
  selectedCommunity = signal<Community | undefined>(undefined);
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
    this.communitiesService.getCommunities(this.communityFilter)
      .subscribe((response) => {
        this.communities = response.data;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.metadata.totalCount;
        this.itemsPerPage = this.communityFilter.size
        this.recordsLoaded = true;
      })
  }

  onPageChanged(pageChanged: number) {
    this.communityFilter.page = pageChanged;
    this.loadCommunities();
  }

  onPageSizeChanged(pageSize: number) {
    this.communityFilter.size = pageSize;
    this.loadCommunities();
  }

  onSortingEvent(sorting: Sorting<SortingComunityColumns>) {
    Object.assign(this.communityFilter, sorting);
    this.loadCommunities();
  }

  onTabChanged(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  get unitsArray(): FormArray {
    return this.buildingUnitsForm.get('units') as FormArray;
  }

  onSelectedCommunityChange(community: Community | undefined) {
    this.selectedCommunity.set(community);
  }

  isCommunityCreationDisabled(): boolean {
    return this.selectedCommunity() !== undefined;
  }

  onValueChanged(search: string): void {
    this.communityFilter.search = search;
    this.loadCommunities();
  }

}
