import { CommonModule } from '@angular/common';
import { Component, input, Input, model, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { Sorting } from '@shared/interfaces/sorting.interface';
import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';
import { BuildingUnit } from '@building_units/interfaces/building-unit.interface';

@Component({
  selector: 'building-units-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './building-units-table.component.html',
  styleUrl: './building-units-table.component.scss'
})
export class BuildingUnitsTableComponent {
  formGroup = input.required<FormGroup>();
  buildingUnits = model.required<FormArray>();
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
  buildingUnitTypes = BuildingUnitType;

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

  keepOrder = (a: any, b: any): any => {
    return a;
  }

}

