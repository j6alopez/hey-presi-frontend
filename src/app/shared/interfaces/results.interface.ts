export interface Results<T> {
  metadata: MetaData;
  data: T[];
}

export interface MetaData {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
