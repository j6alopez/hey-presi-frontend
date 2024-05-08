import { UnitRoles } from "./unit-roles.interface";

export interface Unit {
  id?: string;
  communityId: string;
  name: string;
  unitRoles: UnitRoles[];
}
