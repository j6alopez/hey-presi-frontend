import { Component, effect, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BuildingUnitsService } from '@building_units/building-units.service';
import { BuildingUnitForm } from '@building_units/interfaces/building-unit-form.interface';
import { BuildingUnitsTableComponent } from "../../../building-units/components/building-units-table/building-units-table.component";
import { Community } from '@communities/interfaces/community.interface';
import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';
import { FormOperation } from '@shared/enums/form-operation.enum';
import { BuildingUnit } from '@building_units/interfaces/building-unit.interface';
import { BuildingUnitsFilter } from '@building_units/interfaces/building-units-filter.interface';
import { SortingOrder } from '@shared/enums/sorting-direction.enum';
import { tap } from 'rxjs';

@Component({
  selector: 'building-units-tab',
  standalone: true,
  imports: [
    BuildingUnitsTableComponent,
    ReactiveFormsModule
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
    size: 5,
    sortBy: 'address',
    sortOrder: SortingOrder.ASC,
  }

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
    return this.fb.group({
      communityId: [this.selectedCommunity()!.id, Validators.required],
      address: ['', Validators.required],
      type: [BuildingUnitType.APARTMENT, Validators.required],
      coefficient: [0, [Validators.required, Validators.min(0)]],
      operation: [FormOperation.NEW, Validators.required],
    });
  }

  addExistingUnitToForm(unit: BuildingUnit): FormGroup {
    const form = this.fb.group({
      communityId: [this.selectedCommunity()!.id, Validators.required],
      address: ['', Validators.required],
      type: ['', Validators.required],
      coefficient: [0, [Validators.required, Validators.min(0)]],
      operation: [FormOperation.UPDATE, Validators.required],
    });
    console.log('unit:', unit);
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
        const { communityId, address, type, coefficient } = unit;
        return { communityId, address, type, coefficient, } as BuildingUnit;
      });

    this.buildingUnitsService.bulkUpsertBuildingUnits(buildingUnits).subscribe(() => {
      this.buildingUnitsForm.reset();
      this.unitsArray.clear();
    });
  }

  onCommunityChanged(): void {
    console.log('Selected eff:', this.selectedCommunity);
    effect(() => {
      if (!this.selectedCommunity()) {
        this.unitsArray.clear();
        return;
      }
      this.filter.communityId = this.selectedCommunity()!.id;
      this.buildingUnitsService.getBuildingUnits(this.filter).pipe(
        tap(response => {
          this.unitsArray.clear();
          response.data.forEach((unit: BuildingUnit) => {
            this.unitsArray.push(this.addExistingUnitToForm(unit));
          });
        })  
      ).subscribe();
    })
  }
}