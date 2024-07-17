import { Component, EventEmitter, input, model, OnInit, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { Community } from '@communities/interfaces/community.interface';
import { Sorting } from '@shared/interfaces/sorting.interface';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { CommunityActionComponent } from '../community-action-component/community-action-component';
import { formatAddress } from '@shared/utils/utils';
import { SortingComunityColumns } from '@communities/interfaces/communities-filter.interface';
import { Address } from '@locations/interfaces/address.interface';

@Component({
  selector: 'communities-table',
  standalone: true,
  imports: [
    CommonModule,
    CommunityActionComponent,
    TranslateModule,
  ],
  templateUrl: './communities-table.component.html',
  styleUrl: './communities-table.component.scss'
})
export class CommunitiesTableComponent implements OnInit {

  communities = input<Community[]>([]);
  selectedCommunity = model<Community>();
  sortingEvent = output<Sorting<SortingComunityColumns>>();

  formatAddress = formatAddress;

  ngOnInit(): void {
    this.setColumnHeaders();
  }

  sorting: Sorting<SortingComunityColumns> = {
    sortBy: 'createdAt',
    sortOrder: SortingOrder.ASC
  };

  actionsColumns: string[] = ['action'];
  
  communityColumns: Array<keyof Community> = ['createdAt'];
  addressColumns: Array<keyof Address> = ['street', 'region', 'subregion', 'city'];
  
  columnLabels = new Map<string, string>();

  private setColumnHeaders(): void {
    const columnHeaders = [
      ...this.addressColumns,
      ...this.communityColumns,
      ...this.actionsColumns
    ];
    columnHeaders.forEach(header => {
      this.columnLabels.set(header, `COMMUNITY_TABLE.${header}`);
    });
  }

  sortTable(column: string) : void {
    const sortingOrder = this.isDescendingSorting(column)
      ? SortingOrder.ASC
      : SortingOrder.DESC;
      
    const sortBy = column as keyof SortingComunityColumns;
    this.sorting = {
      sortBy: sortBy,
      sortOrder: sortingOrder
    };
    this.emitEvent();
  }

  isDescendingSorting(column: string): boolean {
    if (this.isActionColumn(column)) {
      return false;
    }
    return this.sorting.sortBy === column && this.sorting.sortOrder === SortingOrder.DESC;
  }

  isAscendingSorting(column: string): boolean {
    if (this.isActionColumn(column)) {
      return false;
    }
    return this.sorting.sortBy === column && this.sorting.sortOrder === SortingOrder.ASC;
  }

  isNotSorted(column: string): boolean {
    if (this.isActionColumn(column)) {
      return false;
    }
    return this.sorting.sortBy !== column;
  }

  isActionColumn(column: string): boolean {
    return this.actionsColumns.includes(column);
  }

  emitEvent() {
    this.selectedCommunity.set(undefined);
    this.sortingEvent.emit(this.sorting);
  }

  onCommunityRowClick(community: Community) {
    this.selectedCommunity() === community
      ? this.selectedCommunity.set(undefined)
      : this.selectedCommunity.set(community);
  }

}
