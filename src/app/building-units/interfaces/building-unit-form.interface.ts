import { BuildingUnitType } from '@building_units/enums/building-unit-type.enum';
import { FormOperation } from '@shared/enums/form-operation.enum';

export interface BuildingUnitForm {
  id?:string;
  communityId?: string;  
  coefficient: number;
  address: string;
  type: BuildingUnitType;
  operation: FormOperation;
}
