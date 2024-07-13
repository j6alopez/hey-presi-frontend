import { Pagination } from "@shared/interfaces/pagintation.interface";
import { Sorting } from "@shared/interfaces/sorting.interface";
import { BuildingUnit } from "./building-unit.interface";

export interface BuildingUnitsFilter extends Pagination, Sorting<BuildingUnit> {
  communityId?: string;
}