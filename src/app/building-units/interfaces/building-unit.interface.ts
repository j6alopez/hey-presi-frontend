import { BuildingUnitType } from "building-units/enums/building-unit-type.enum";
import { BuildingUnitRole } from "./building-unit-role.interface";

export interface BuildingUnit {
  id: string;
  communityId: string;  
  address: string;
  coefficient: number;
  type: BuildingUnitType;
  unitRoles: BuildingUnitRole[];
}
