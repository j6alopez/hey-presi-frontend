import { SortingDirection } from "../enums/sorting-direction.enum";

export interface Sorting {
  sortBy: string;
  order: SortingDirection;
}
