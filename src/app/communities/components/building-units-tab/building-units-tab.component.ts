import { Component, effect, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { filter, tap, map } from 'rxjs';

import { BuildingUnit } from '@building_units/interfaces/building-unit.interface';
import { BuildingUnitForm } from '@building_units/interfaces/building-unit-form.interface';
import { BuildingUnitsFilter } from '@building_units/interfaces/building-units-filter.interface';
import { BuildingUnitsService } from '@building_units/building-units.service';
import { BuildingUnitsTableComponent } from "@building_units/components/building-units-table/building-units-table.component";
import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';
import { Community } from '@communities/interfaces/community.interface';
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

  editingForm?: FormGroup;
  editingUnit?: BuildingUnit;


  constructor(private fb: FormBuilder) {
    this.buildingUnitsForm = this.fb.group({
      units: this.fb.array<BuildingUnitForm>([])
    });
    this.onCommunityChanged();
  }

  addBuildingUnit(): void {
    this.unitsArray.push(this.addNewUnitToForm());
  }

  addNewUnitToForm(): FormGroup {
    const form = new FormGroup<BuildingUnitForm>({
      id: new FormControl(null),
      address: new FormControl('', { nonNullable: true }),
      type: new FormControl(BuildingUnitType.APARTMENT, { nonNullable: true }),
      builtArea: new FormControl(0, { nonNullable: true }),
      coefficient: new FormControl(0, { nonNullable: true }),
      communityId: new FormControl(this.selectedCommunity()!.id, { nonNullable: true }),
    });
    return form;
  }

  addExistingUnitToForm(unit: BuildingUnit): FormGroup {
    const form = this.fb.group({
      id: [unit.id, Validators.required],
      communityId: [this.selectedCommunity()!.id, Validators.required],
      address: ['', Validators.required],
      type: ['', Validators.required],
      builtArea: [0.00, [Validators.required, Validators.min(0)]],
      coefficient: [0.00, [Validators.required, Validators.min(0)]],
    });
    form.patchValue(unit);
    return form;
  }

  onSubmit() {
    if (this.buildingUnitsForm.invalid) {
      this.buildingUnitsForm.markAllAsTouched();
      return;
    }

    if (this.editingForm) {
      this.updateBuildingUnit();
      return;
    }

    this.createBuildingUnits();

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
            this.unitsArray.disable();
          });
        }),
        filter(response => !!response),
        tap(() => this.recordsLoaded = true)
      ).subscribe();
    })
  }

  showTable(): boolean {
    const isSelectedCommunity = this.selectedCommunity() !== undefined;
    if (!this.recordsLoaded && !isSelectedCommunity) {
      return true;
    }
    return this.recordsLoaded && isSelectedCommunity;
  }

  trackEditingUnit(formGroup: FormGroup): void {
    this.editingForm = formGroup;
    this.editingUnit = formGroup.value;
    this.editingForm.enable();
  }

  private getNewUnits(): BuildingUnit[] {
    return this.unitsArray.value.filter((unit: BuildingUnitForm) => !unit.id)
      .map((unit: BuildingUnitForm) => {
        const { communityId, address, type, coefficient, builtArea } = unit;
        return { communityId, address, type, coefficient, builtArea };
      });

  }

  private createBuildingUnits(): void {
    const buildingUnits = this.getNewUnits();
    this.buildingUnitsService.bulkUpsertBuildingUnits(buildingUnits).subscribe(() => {
      this.buildingUnitsForm.reset();
      this.unitsArray.clear();
    });
  }

  private updateBuildingUnit(): void {
    const buildingUnit = this.editingForm!.value as BuildingUnit;
    this.buildingUnitsService.updateBuildingUnit(buildingUnit).pipe(
      tap(() => this.editingForm!.disable()),
      tap(() => this.editingForm = undefined),
    ).subscribe();
  }

  get unitsArray(): FormArray {
    return this.buildingUnitsForm.get('units') as FormArray;
  }
}
