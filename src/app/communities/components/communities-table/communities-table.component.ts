import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Address } from '../../../locations/interfaces/address.interface';
import { CommunitiesService } from '../../communities.service';
import { Community } from '../../interfaces/community.interface';
import { Sorting } from '../../../shared/interfaces/sorting.interface';
import { SortingOrder } from '../../../shared/enums/sorting-direction.enum';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'communities-table',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    TranslateModule
  ],
  templateUrl: './communities-table.component.html',
  styleUrl: './communities-table.component.scss'
})
export class CommunitiesTableComponent implements OnInit {

  private communitiesService = inject(CommunitiesService);

  communities: Community[] = [];
  communityColumns: Array<keyof Community> = ['createdAt'];
  addressColumns: Array<keyof Address> = ['street', 'region', 'subregion', 'city'];
  actionsColumns: string[] = ['actions'];
  
  sorting: Sorting = {
    sortBy: 'createdAt',
    order: SortingOrder.ASC
  };
  
  columnLabels = new Map<string, string>();
  

  ngOnInit(): void {
    this.initializeColumns();
    this.fetchData();
  }

  fetchData(): void {
    this.communitiesService.getCommunities(this.sorting).subscribe(communities => {
      this.communities = communities;
    });
  }

  initializeColumns(): void {
    const columnHeaders = [
      ...this.communityColumns, 
      ...this.addressColumns,
      ...this.actionsColumns
    ];
    this.columnLabels.entries
    columnHeaders.forEach(header => {
      this.columnLabels.set(header, `COMMUNITY_TABLE.${header}`);
    });
  }

  sortTable(column: string) {
    const sortingOrder = this.isDescendingSorting(column)
      ? SortingOrder.ASC
      : SortingOrder.DESC;

    this.sorting = {
      sortBy: column,
      order: sortingOrder
    };

    this.fetchData();
  }

  isDescendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingOrder.DESC;
  }

  isAscendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingOrder.ASC;
  }

}
