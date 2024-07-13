import { BuildingUnit } from "./building-unit.interface";

export interface UpsertBuildingUnitsBulk {
  buildingUnits: BuildingUnit[];
}