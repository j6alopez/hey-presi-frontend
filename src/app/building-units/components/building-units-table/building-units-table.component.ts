import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { Sorting } from '@shared/interfaces/sorting.interface';
import { formatAddress } from '@shared/utils/utils';
import { BuildingUnit } from 'building-units/interfaces/building-unit.interface';

@Component({
  selector: 'building-units-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './building-units-table.component.html',
  styleUrl: './building-units-table.component.scss'
})
export class BuildingUnitsTableComponent {
  buildingUnits = input<BuildingUnit[]>([]);
  sortingEvent = output<Sorting>();

  ngOnInit(): void {
    this.setColumnHeaders();
  }

  buildingUnitsColumns: Array<keyof BuildingUnit> = ['address', 'type', 'coefficient'];
  actionsColumns: string[] = ['action'];

  sorting: Sorting = {
    sortBy: 'address',
    sortOrder: SortingOrder.ASC
  };

  columnLabels = new Map<string, string>();

  private setColumnHeaders(): void {
    const columnHeaders = [
      ...this.buildingUnitsColumns,
      ...this.actionsColumns
    ];
    columnHeaders.forEach(header => {
      this.columnLabels.set(header, `BUILDING_UNIT_TABLE.${header}`);
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
