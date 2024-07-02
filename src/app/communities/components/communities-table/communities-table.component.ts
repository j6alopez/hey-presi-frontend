import { Component, EventEmitter, input, OnInit, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { Address } from '../../../locations/interfaces/address.interface';
import { Community } from '../../interfaces/community.interface';
import { Sorting } from '../../../shared/interfaces/sorting.interface';
import { SortingOrder } from '../../../shared/enums/sorting-direction.enum';
import { CommunityActionComponentComponent } from '../community-action-component/community-action-component.component';

@Component({
  selector: 'communities-table',
  standalone: true,
  imports: [
    CommunityActionComponentComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './communities-table.component.html',
  styleUrl: './communities-table.component.scss'
})
export class CommunitiesTableComponent implements OnInit {
  communities  = input<Community[]>([]);
  sortingEvent = output<Sorting>();

  ngOnInit(): void {
    this.setColumnHeaders();
  }

  communityColumns: Array<keyof Community> = ['createdAt'];
  addressColumns: Array<keyof Address> = ['street', 'region', 'subregion', 'city'];
  actionsColumns: string[] = ['action'];

  sorting: Sorting = {
    sortBy: 'createdAt',
    sortOrder: SortingOrder.ASC
  };

  columnLabels = new Map<string, string>();

  private setColumnHeaders(): void {
    const columnHeaders = [
      ...this.communityColumns,
      ...this.addressColumns,
      ...this.actionsColumns
    ];
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
    this.sortingEvent.emit(this.sorting);
  }

}
