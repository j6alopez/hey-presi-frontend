import { SortingOrder } from "../enums/sorting-direction.enum";

export interface Sorting {
  sortBy: string;
  sortOrder: SortingOrder;
}
