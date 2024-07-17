import { Component, effect, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { delay, filter, tap } from 'rxjs';
import { BuildingUnitsService } from '@building_units/building-units.service';
import { BuildingUnitForm } from '@building_units/interfaces/building-unit-form.interface';
import { BuildingUnitsTableComponent } from "../../../building-units/components/building-units-table/building-units-table.component";
import { Community } from '@communities/interfaces/community.interface';
import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';
import { FormOperation } from '@shared/enums/form-operation.enum';
import { BuildingUnit } from '@building_units/interfaces/building-unit.interface';
import { BuildingUnitsFilter } from '@building_units/interfaces/building-units-filter.interface';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

@Component({
  selector: 'building-units-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BuildingUnitsTableComponent,
    SpinnerComponent
  ],
  templateUrl: './building-units-tab.component.html',
  styleUrl: './building-units-tab.component.scss'
})
export class BuildingUnitsTabComponent {
  private readonly buildingUnitsService = inject(BuildingUnitsService);
  
  selectedCommunity = input<Community>();

  buildingUnitsForm: FormGroup;
  filter: BuildingUnitsFilter = {
    page: 1,
    size: 10,
    sortBy: 'address',
    sortOrder: SortingOrder.ASC,
  }

  recordsLoaded: boolean = false;

  constructor(private fb: FormBuilder) {
    this.buildingUnitsForm = this.fb.group({
      units: this.fb.array<BuildingUnitForm>([])
    });
    this.onCommunityChanged();
  }

  addBuildingUnit(): void {
    this.unitsArray.push(this.addNewUnitToForm());
  }

  get unitsArray(): FormArray {
    return this.buildingUnitsForm.get('units') as FormArray;
  }

  addNewUnitToForm(): FormGroup {
    const form = new FormGroup<BuildingUnitForm>({
      id: new FormControl(null),
      coefficient: new FormControl(0, { nonNullable: true }),
      address: new FormControl('', { nonNullable: true }),
      type: new FormControl(BuildingUnitType.APARTMENT, { nonNullable: true }),
      operation: new FormControl(FormOperation.NEW, { nonNullable: true }),
      communityId: new FormControl(this.selectedCommunity()!.id, { nonNullable: true }),
    });
    return form
  }

  addExistingUnitToForm(unit: BuildingUnit): FormGroup {
    const form = this.fb.group({
      id: [unit.id, Validators.required],
      communityId: [this.selectedCommunity()!.id, Validators.required],
      address: ['', Validators.required],
      type: ['', Validators.required],
      coefficient: [0, [Validators.required, Validators.min(0)]],
      operation: [FormOperation.UPDATE, Validators.required],
    });
    form.patchValue(unit);
    return form;
  }

  onSubmit() {
    if (this.buildingUnitsForm.invalid) {
      this.buildingUnitsForm.markAllAsTouched();
      return;
    }

    const buildingUnits: BuildingUnit[] = this.buildingUnitsForm.get('units')?.value.map(
      (unit: BuildingUnitForm) => {
        return {
          communityId: unit.communityId,
          address: unit.address,
          type: unit.type,
          coefficient: unit.coefficient,
        }
      });

    this.buildingUnitsService.bulkUpsertBuildingUnits(buildingUnits).subscribe(() => {
      this.buildingUnitsForm.reset();
      this.unitsArray.clear();
    });
  }

  onCommunityChanged(): void {
    effect(() => {
      if (!this.selectedCommunity) {
        return;
      }
      this.recordsLoaded = false;
      this.unitsArray.clear();
      if (this.selectedCommunity() === undefined) {
        return;
      }
      this.filter.communityId = this.selectedCommunity()!.id;
      this.buildingUnitsService.getBuildingUnits(this.filter).pipe(
        tap(response => {
          response.data.forEach((unit: BuildingUnit) => {
            this.unitsArray.push(this.addExistingUnitToForm(unit));
          });
        }),
        filter(response => !!response),
        tap(() => this.recordsLoaded = true)
      ).subscribe();
    })
  }
  showTable(): boolean {
    const isSelectedCommunity = this.selectedCommunity() !== undefined;
    if(!this.recordsLoaded && !isSelectedCommunity){
      return true;
    }      

    return this.recordsLoaded && isSelectedCommunity;
  }
}
