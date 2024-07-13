import { SortingOrder } from "../enums/sorting-direction.enum";

export interface Sorting<T> {
  sortBy: keyof T;
  sortOrder: SortingOrder;
}
