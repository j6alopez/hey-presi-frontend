import { Component, inject, OnInit } from '@angular/core';
import { CommunitiesService } from '../../communities.service';
import { Community } from '../../interfaces/community.interface';
import { Address } from '../../../locations/interfaces/address.interface';
import { Sorting } from '../../../shared/interfaces/sorting.interface';
import { SortingDirection } from '../../../shared/enums/sorting-direction.enum';

@Component({
  selector: 'communities-table',
  standalone: true,
  imports: [],
  templateUrl: './communities-table.component.html',
  styleUrl: './communities-table.component.scss'
})
export class CommunitiesTableComponent implements OnInit {
  communities: Community[] = [];
  communityColumns: Array<keyof Community> = ['createdAt'];
  addressColumns: Array<keyof Address> = ['street', 'region', 'subregion', 'city'];
  sorting: Sorting = {
    sortBy: 'createdAt',
    order: SortingDirection.ASC
  };

  private communitiesService = inject(CommunitiesService);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.communitiesService.getCommunities(this.sorting).subscribe(communities => {
      this.communities = communities;
    });
  }

  isDescendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingDirection.DESC;
  }

  isAscendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingDirection.ASC;
  }

}
