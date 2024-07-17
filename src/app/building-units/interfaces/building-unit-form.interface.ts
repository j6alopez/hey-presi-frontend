import { FormControl } from '@angular/forms';
import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';
import { FormOperation } from '@shared/enums/form-operation.enum';

export interface BuildingUnitForm {
  id: FormControl<string | null>;
  communityId: FormControl<string>;
  coefficient: FormControl<number>;
  address: FormControl<string>;
  type: FormControl<BuildingUnitType>;
  operation: FormControl<FormOperation>;
}
