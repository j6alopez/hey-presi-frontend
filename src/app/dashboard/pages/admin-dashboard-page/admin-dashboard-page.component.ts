import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommunitiesService } from './../../../communities/communities.service';
import { Community } from '../../../communities/interfaces/community.interface';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { TopBarComponent } from '../../../shared/components/navigation/top-bar/top-bar.component';
import { CommunitiesTableComponent } from '../../../communities/components/communities-table/communities-table.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
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

  communities : Community[] = [];
  recordsLoaded = false;
  pagination: Pagination = {
    page: 1,
    size: 25,
  }

  sorting: Sorting = {
    sortBy: 'createdAt',
    order: SortingOrder.ASC,
  }

  ngOnInit(): void {
    this.communitiesService.getCommunities(this.pagination, this.sorting).subscribe(
      () => {
        this.communities = this.communitiesService.communities;
        this.recordsLoaded = true;
      }
    )
  }

}
