export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Sorting<T> {
  sortBy: keyof T;
  sortOrder: SortingOrder;
}
