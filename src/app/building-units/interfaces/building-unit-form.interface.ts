import { FormControl } from '@angular/forms';
import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';

export interface BuildingUnitForm {
  id: FormControl<string | null>;
  communityId: FormControl<string>;
  coefficient: FormControl<number>;
  address: FormControl<string>;
  type: FormControl<BuildingUnitType>;
  builtArea: FormControl<number>;
}
