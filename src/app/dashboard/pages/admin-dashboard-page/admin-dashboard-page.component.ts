import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommunitiesService } from './../../../communities/communities.service';
import { Community } from '../../../communities/interfaces/community.interface';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { TopBarComponent } from '../../../shared/components/navigation/top-bar/top-bar.component';
import { CommunitiesTableComponent } from '../../../communities/components/communities-table/communities-table.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { Page } from '../../../shared/interfaces/page.interface';
import { SortingOrder } from '../../../shared/enums/sorting-direction.enum';
import { Sorting } from '../../../shared/interfaces/sorting.interface';



@Component({
  standalone: true,
  imports: [
    CommonModule,
    CommunitiesTableComponent,
    PaginatorComponent,
    RouterModule,
    SpinnerComponent,
    TopBarComponent,
  ],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashBoardPageComponent implements OnInit {
  private readonly communitiesService = inject(CommunitiesService);

  communities: Community[] = [];
  recordsLoaded = false;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 1;

  initialField: keyof Community = 'createdAt';

  pagination: Page = {
    page: 1,
    size: 10,
  }

  sorting: Sorting = {
    sortBy: this.initialField,
    sortOrder: SortingOrder.ASC,
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

}
