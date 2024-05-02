import { UnitRoles } from "./unit-roles.interface";

export interface Unit {
  id?: string;
  name: string;
  communityId: string;
  unitRoles: UnitRoles[];
}
