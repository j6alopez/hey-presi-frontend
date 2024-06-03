import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Address } from '../../../locations/interfaces/address.interface';
import { CommunitiesService } from '../../communities.service';
import { Community } from '../../interfaces/community.interface';
import { Sorting } from '../../../shared/interfaces/sorting.interface';
import { SortingDirection } from '../../../shared/enums/sorting-direction.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'communities-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './communities-table.component.html',
  styleUrl: './communities-table.component.scss'
})
export class CommunitiesTableComponent implements OnInit {

  communities: Community[] = [];
  communityColumns: Array<keyof Community> = ['createdAt'];
  addressColumns: Array<keyof Address> = ['street', 'region', 'subregion', 'city'];
  columns: string[] = [
    ...this.communityColumns.map(column => `COMMUNITY_TABLE.${column}`),
    ...this.addressColumns.map(column => `COMMUNITY_TABLE.${column}`)
  ]
  sorting: Sorting = {
    sortBy: 'createdAt',
    order: SortingDirection.ASC
  };

  private communitiesService = inject(CommunitiesService);

  ngOnInit(): void {
    this.fetchData();
    console.table(this.columns);
  }

  fetchData(): void {
    this.communitiesService.getCommunities(this.sorting).subscribe(communities => {
      this.communities = communities;
    });
  }

  sortTable(column: string) {
    const futureSortingOrder = this.isDescendingSorting(column)
      ? SortingDirection.ASC
      : SortingDirection.DESC;

      this.sorting = {
        sortBy: column,
        order: futureSortingOrder
      };

      this.fetchData();
  }

  isDescendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingDirection.DESC;
  }

  isAscendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingDirection.ASC;
  }

}
