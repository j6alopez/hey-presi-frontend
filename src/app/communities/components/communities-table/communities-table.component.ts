import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { Address } from '../../../locations/interfaces/address.interface';
import { Community } from '../../interfaces/community.interface';
import { Sorting } from '../../../shared/interfaces/sorting.interface';
import { SortingOrder } from '../../../shared/enums/sorting-direction.enum';

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
  communities = input<Community[]>([]);
  @Output()
  sortingEvent = new EventEmitter<Sorting>();

  ngOnInit(): void {
    this.setColumnHeaders();
  }

  communityColumns: Array<keyof Community> = ['createdAt'];
  addressColumns: Array<keyof Address> = ['street', 'region', 'subregion', 'city'];
  actionsColumns: string[] = ['actions'];

  sorting: Sorting = {
    sortBy: 'createdAt',
    order: SortingOrder.ASC
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
      order: sortingOrder
    };
  }

  isDescendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingOrder.DESC;
  }

  isAscendingSorting(column: string): boolean {
    return this.sorting.sortBy === column && this.sorting.order === SortingOrder.ASC;
  }

  emitEvent() {
    this.sortingEvent.emit(this.sorting);
  }

}
